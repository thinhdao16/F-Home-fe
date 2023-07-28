import "./chart.scss";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Bar,
} from "recharts";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useMemo } from "react";
import { DataContext } from "../../pages/DataContext";

const Chart = ({ users }) => {
  const {dataUser, setDataUser} = useContext(DataContext)



const[dataPost , setDataPost] = useState([])
const arrPostFil = useMemo(() => {
  if (!dataUser) return [];
  return dataUser?.filter(
    (posting) => posting?.roleName === "fptmember"||
    posting?.roleName === "landlord"
  );
}, [dataPost]);
// console.log(arrPostFil)

  const [refresh, setRefresh] = useState(false); // thêm state để xác định trạng thái của nút "Làm mới"
  const userPosting = JSON.parse(localStorage.getItem("access_token"));
  const fetchPosts = async () => {
    try {
      const responsePost = await axios.get("http://localhost:3000/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userPosting.data.accessToken}`,
        },
      });
      setDataPost(responsePost.data.data.postings);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, [refresh]); // thêm refresh vào dependency array để khi giá trị của refresh thay đổi thì useEffect sẽ chạy lại

  const handleRefresh = () => {
    setRefresh(!refresh); // đổi giá trị của refresh để gọi lại useEffect
  };

  const filterDataByMonth = (data, month) => {
    return data?.filter((item) => {
      const createdAt = new Date(item?.createdAt);
      return createdAt.getMonth() === month;
    });
  };
  const filterDataPostByMonth = (data, month, day) => {
    return data?.filter((item) => {
      const createdAt = new Date(item?.createdAt);
      return createdAt.getMonth() === month && createdAt.getDate() === day;
    });
  };
  const filterDataPostByMonthNow = (data) => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentDay = currentDate.getDate();
  
    return data?.filter((item) => {
      const createdAt = new Date(item?.createdAt);
      return createdAt.getMonth() === currentMonth && createdAt.getDate() === currentDay;
    });
  };
  
  const filteredData2 = filterDataByMonth(arrPostFil, 5);
  const filteredData3 = filterDataByMonth(arrPostFil, 6);

  const filteredDataPostDM1 = filterDataPostByMonth(dataPost, 1,15);
  const filteredDataPostDM2 = filterDataPostByMonth(dataPost, 1,16);
  const filteredDataPostDM3 = filterDataPostByMonth(dataPost, 1,17);
  const filteredDataPostDM4 = filterDataPostByMonth(dataPost, 1,18);
  const filteredDataPostDM5 = filterDataPostByMonth(dataPost, 1,19);
  const filteredDataPostDM6 = filterDataPostByMonth(dataPost, 1,20);
  const filteredDataPostDM7 = filterDataPostByMonth(dataPost, 1,21);
  const filteredDataPostDM8 = filterDataPostByMonth(dataPost, 1,22);
  const filteredDataPostDM9 = filterDataPostByMonth(dataPost, 1,23);
  const filteredDataPostDM10 = filterDataPostByMonth(dataPost, 1,24);
  const filteredDataPostDM11 = filterDataPostByMonth(dataPost, 1,25);
  const filteredDataPostDM12 = filterDataPostByMonth(dataPost, 1,26);
  const filteredDataPostDM13 = filterDataPostByMonth(dataPost, 1,27);
  const filteredDataPostDM14 = filterDataPostByMonth(dataPost, 1,28);
  const filteredDataPostDM15 = filterDataPostByMonth(dataPost, 2,0);
  const filteredDataPostDM16 = filterDataPostByMonth(dataPost, 2,1);
  const filteredDataPostDM17 = filterDataPostByMonth(dataPost, 2,2);
  const filteredDataPostDM18 = filterDataPostByMonth(dataPost, 2,3);
  const filteredDataPostDM19 = filterDataPostByMonth(dataPost, 2,4);
  const filteredDataPostDM20 = filterDataPostByMonth(dataPost, 2,5);
  const filteredDataPostDM21 = filterDataPostByMonth(dataPost, 2,6);
  const filteredDataPostDM22 = filterDataPostByMonth(dataPost, 2,7);
  const filteredDataPostDM23 = filterDataPostByMonth(dataPost, 2,8);
  const filteredDataPostDM24 = filterDataPostByMonth(dataPost, 2,9);
  const filteredDataPostDM25 = filterDataPostByMonth(dataPost, 2,10);
  const filteredDataPostDM26 = filterDataPostByMonth(dataPost, 2,11);
  const filteredDataPostDM27 = filterDataPostByMonth(dataPost, 2,12);
  const filteredDataPostDM28 = filterDataPostByMonth(dataPost, 2,13);
  const filteredDataPostDM29 = filterDataPostByMonth(dataPost, 2,14);
  const filteredDataPostDM30 = filterDataPostByMonth(dataPost, 2,15);
  const filteredDataPostDM31 = filterDataPostByMonth(dataPost, 2,16);
  const filteredDataPostDM32 = filterDataPostByMonth(dataPost, 2,17);
  const filteredDataPostDM33 = filterDataPostByMonth(dataPost, 2,18);
  const filteredDataPostDM34 = filterDataPostByMonth(dataPost, 2,19);
  const filteredDataPostDM35 = filterDataPostByMonth(dataPost, 2,20);
  const filteredDataPostDM36 = filterDataPostByMonth(dataPost, 2,21);
  const filteredDataPostDM37 = filterDataPostByMonth(dataPost, 2,22);
  const filteredDataPostDM38 = filterDataPostByMonth(dataPost, 2,23);
  const filteredDataPostDM39 = filterDataPostByMonthNow(dataPost);
  const data = [
    { name: "" , total:""},
    // { name: "January", total: filteredData1?.length },
    { name: "June", total: filteredData2?.length },
    { name: "July", total: filteredData3?.length },
  ];
  const dataPostDMChart = [
    { name: "" , total:""},
    { name: "15/2", total: filteredDataPostDM1?.length },
    { name: "16/2", total: filteredDataPostDM2?.length },
    { name: "17/2", total: filteredDataPostDM3?.length },
    { name: "18/2", total: filteredDataPostDM4?.length },
    { name: "19/2", total: filteredDataPostDM5?.length },
    { name: "20/2", total: filteredDataPostDM6?.length },
    { name: "21/2", total: filteredDataPostDM7?.length },
    { name: "22/2", total: filteredDataPostDM8?.length },
    { name: "23/2", total: filteredDataPostDM9?.length },
    { name: "24/2", total: filteredDataPostDM10?.length },
    { name: "25/2", total: filteredDataPostDM11?.length },
    { name: "26/2", total: filteredDataPostDM12?.length },
    { name: "27/2", total: filteredDataPostDM13?.length },
    { name: "28/2", total: filteredDataPostDM14?.length },
    { name: "01/3", total: filteredDataPostDM15?.length },
    { name: "02/3", total: filteredDataPostDM16?.length },
    { name: "03/3", total: filteredDataPostDM17?.length },
    { name: "04/3", total: filteredDataPostDM18?.length },
    { name: "05/3", total: filteredDataPostDM19?.length },
    { name: "06/3", total: filteredDataPostDM20?.length },
    { name: "07/3", total: filteredDataPostDM21?.length },
    { name: "08/3", total: filteredDataPostDM22?.length },
    { name: "09/3", total: filteredDataPostDM23?.length },
    { name: "10/3", total: filteredDataPostDM24?.length },
    { name: "11/3", total: filteredDataPostDM25?.length },
    { name: "12/3", total: filteredDataPostDM26?.length },
    { name: "13/3", total: filteredDataPostDM27?.length },
    { name: "14/3", total: filteredDataPostDM28?.length },
    { name: "15/3", total: filteredDataPostDM29?.length },
    { name: "16/3", total: filteredDataPostDM30?.length },
    { name: "17/3", total: filteredDataPostDM31?.length },
    { name: "18/3", total: filteredDataPostDM32?.length },
    { name: "19/3", total: filteredDataPostDM33?.length },
    { name: "20/3", total: filteredDataPostDM34?.length },
    { name: "21/3", total: filteredDataPostDM35?.length },
    { name: "22/3", total: filteredDataPostDM36?.length },
    { name: "22/3", total: filteredDataPostDM37?.length },
    { name: "23/3", total: filteredDataPostDM38?.length },
    { name: "24/3", total: filteredDataPostDM39?.length },
  ];
  return (
    <div className="chart">
      <div className="title"onClick={handleRefresh}>Last 2 Months User</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={"100%"}
          height={250}
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
      <div className="title">Last 2 Months Posting</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        
        <AreaChart
          width={"100%"}
          height={250}
          data={dataPostDMChart}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
