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
import { useEffect, useState } from "react";
import axios from "axios";
import { useMemo } from "react";

const Chart2 = ({ users }) => {
const[dataPost , setDataPost] = useState([])
const[dataPostLike , setDataPostLike] = useState([])
const[dataPostCMT , setDataPostCMT] = useState([])

const arrPostPublish = useMemo(() => {
  if (!dataPost) return [];
  return dataPost?.filter(
    (posting) => posting.status === "published"
  );
}, [dataPost]);
// console.log(dataPost)

  const [refresh, setRefresh] = useState(false); // thêm state để xác định trạng thái của nút "Làm mới"
  const userPosting = JSON.parse(localStorage.getItem("access_token"));
  const fetchPosts = async () => {
    try {
      const responsePost = await axios.get("https://f-home-be.vercel.app/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userPosting.data.accessToken}`,
        },
      });
      setDataPost(responsePost?.data?.data?.postings);
      const responsePostLike = await axios.get("https://f-home-be.vercel.app/getAllFavourite", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userPosting.data.accessToken}`,
        },
      });
      setDataPostLike(responsePostLike?.data?.data?.favourite);
      const responsePostCMT = await axios.get("https://f-home-be.vercel.app/allComment", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userPosting.data.accessToken}`,
        },
      });
      setDataPostCMT(responsePostCMT?.data?.data?.postingComments);
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

  const filteredDataPost1 = filterDataByMonth(arrPostPublish, 0);
  const filteredDataPost2 = filterDataByMonth(arrPostPublish, 1);
  const filteredDataPost3 = filterDataByMonth(arrPostPublish, 2);

  const filteredDataPostLike1 = filterDataByMonth(dataPostLike, 0);
  const filteredDataPostLike2 = filterDataByMonth(dataPostLike, 1);
  const filteredDataPostLike3 = filterDataByMonth(dataPostLike, 2);

  const filteredDataPostCMT1 = filterDataByMonth(dataPostCMT, 0);
  const filteredDataPostCMT2 = filterDataByMonth(dataPostCMT, 1);
  const filteredDataPostCMT3 = filterDataByMonth(dataPostCMT, 2);


  const dataPaidPost = [
    { name: "" , total:""},
    // { name: "January", total: filteredDataPost1?.length*5 },
    { name: "February", total: filteredDataPost2?.length },
    { name: "March", total: filteredDataPost3?.length },
  ];

  const dataIntPost = [
    { name: "" , total:""},
    // { name: "January", total: filteredDataPostLike1.length + filteredDataPostCMT1.length },
    { name: "February", total: filteredDataPostCMT2.length + filteredDataPostLike2.length },
    { name: "March", total: filteredDataPostCMT3.length + filteredDataPostLike3.length},
  ];

  return (
    <div className="chart">
      <div className="title"onClick={handleRefresh}>Last 2 Months Post</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={"100%"}
          height={250}
          data={dataPaidPost}
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
      <div className="title">Last 2 Months Interact</div>
      <ResponsiveContainer width="100%" aspect={2 / 1}>
        
        <AreaChart
          width={"100%"}
          height={250}
          data={dataIntPost}
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

export default Chart2;
