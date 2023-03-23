import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useMemo } from "react";

const Widget = ({ type }) => {
  let data;

  const[dataPostLike , setDataPostLike] = useState([])
  const [dataPost, setDataPost] = useState([]);
  const [dataUser, setDataUser] = useState([]);

  const arrPostPublish = useMemo(() => {
    if (!dataPost) return [];
    return dataPost?.filter((posting) => posting.status === "published");
  }, [dataPost]);
  // Assuming your array is called 'data'
  const count = arrPostPublish.reduce((acc, curr) => {
    const userId = curr?.userPosting?._id;
    acc[userId] = (acc[userId] || 0) + 1;
    return acc;
  }, {});
  const sortedKeys = Object.keys(count).sort((a, b) => count[b] - count[a]);
  const mostFrequentUserId = sortedKeys[0];
  const filteredDataMost = arrPostPublish.filter(
    (obj) => obj?.userPosting?._id === mostFrequentUserId
  );

  const count1 = dataPostLike.reduce((acc, curr) => {
    const userId = curr?.user?._id;
    acc[userId] = (acc[userId] || 0) + 1;
    return acc;
  }, {});
  const sortedKeys1 = Object.keys(count1).sort((a, b) => count1[b] - count1[a]);
  const mostFrequentUserId1 = sortedKeys1[0];
  const filteredDataIntMost = dataPostLike.filter(
    (obj) => obj?.user?._id === mostFrequentUserId1
  );

  const filterDataPostByMonthNow = (data) => {
    const currentDate = new Date();
    const yesterday = new Date(currentDate);
    yesterday.setDate(currentDate.getDate() - 1);
    const yesterdayMonth = yesterday.getMonth();
    const yesterdayDate = yesterday.getDate();
  
    return data?.filter((item) => {
      const createdAt = new Date(item?.createdAt);
      return createdAt.getMonth() === yesterdayMonth && createdAt.getDate() === yesterdayDate;
    });
  };
  
const mostSub = filterDataPostByMonthNow(dataUser)
console.log(mostSub)
  const [refresh, setRefresh] = useState(false); // thêm state để xác định trạng thái của nút "Làm mới"
  const userPosting = JSON.parse(localStorage.getItem("access_token"));
  const fetchPosts = async () => {
    try {
      const responsePost = await axios.get("https://fhome-be.vercel.app/posts", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userPosting.data.accessToken}`,
        },
      });
      setDataPost(responsePost.data.data.postings);
      const responsePostLike = await axios.get("https://fhome-be.vercel.app/getAllFavourite", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userPosting.data.accessToken}`,
        },
      });
      setDataPostLike(responsePostLike?.data?.data?.favourite);
      const response = await axios.get("https://fhome-be.vercel.app/getAllUsers", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userPosting.data.accessToken}`,
        },
      });
      setDataUser(response.data);
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

  // temporary amount of money
//   const amount = Math.floor(Math.random() * 100);
//   const diff = Math.floor(Math.random() * 100);

  switch (type) {
    case "users":
      data = {
        title: "MOST POSTED",
        isMoney: false,
        link: filteredDataMost[0]?.userPosting?.email,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
        textName: filteredDataMost?.length
        // timePost: ((<KeyboardArrowUpIcon />), ),
      };
      break;
    case "orders":
      data = {
        title: "INTERACT",
        isMoney: false,
        link: filteredDataIntMost[0]?.user?.email,
        icon: (
          <ShoppingCartOutlinedIcon
            className="icon"
            style={{
              color: "goldenrod",
              backgroundColor: "rgba(218, 65, 32, 0.2)",
            }}
          />
        ),
        textName:  filteredDataIntMost?.length
        // timePost:
      };
      break;
    case "earnings":
      data = {
        title: "SUBCRIBED",
        isMoney: false,
        link: "User",
        icon: (
          <MonetizationOnOutlinedIcon
            className="icon"
            style={{
              color: "green",
              backgroundColor: "rgba(0, 128, 0, 0.2)",
            }}
          />
        ),
        textName:mostSub.length,
        // timePost:'User'
      };
      break;
    case "balance":
      data = {
        title: "REVENUE",
        isMoney: true,
        link: "admin",
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className="icon"
            style={{
              color: "purple",
              backgroundColor: "rgba(128, 0, 128, 0.2)",
            }}
          />
        ),
        textName:  arrPostPublish?.length
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {data.textName}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right" onClick={handleRefresh}>
        <div className="percentage positive">{data?.timePost}</div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
