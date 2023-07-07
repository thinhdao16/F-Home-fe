import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import PsychologyIcon from "@mui/icons-material/Psychology";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import { useContext } from "react";
import { DataContext } from "../../pages/DataContext";
import { Dropdown, Space } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { MenuProps } from "antd";
const Sidebar = () => {
  const { logOut, posting, allCmt, isLiked } = useContext(DataContext);
  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };
  const items = [
    {
      label: (
        <Link to="/home/points">
          <Inventory2Icon className="icon" />
          <span>Transaction</span>
        </Link>
      ),
      key: "0",
    },
    {
      label: (
        <Link to="/home/transApps">
          <Inventory2Icon className="icon" />
          <span>Approved</span>
        </Link>
      ),
      key: "1",
    },
    {
      label: (
        <Link to="/home/transRes">
          <Inventory2Icon className="icon" />
          <span>Rejected</span>
        </Link>
      ),
        key :"2",
    },
  ];

  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Admin Panel</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN MENU</p>
          <li>
            <Link to="/home">
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </Link>
          </li>

          <p className="title">LISTS MENU</p>
          <li>
            <Link to="/home/users">
              <Inventory2Icon className="icon" />
              <span>Users</span>
            </Link>
          </li>
          <li>
            <Link to="/home/products">
              <Inventory2Icon className="icon" />
              <span>Products</span>
            </Link>
          </li>
          <li>
            <Inventory2Icon className="icon" />
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <span>
                  Point
                  <DownOutlined />
                </span>
              </a>
            </Dropdown>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span onClick={handleSignOut}>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div className="colorOptions"></div>
        <div className="colorOptions"></div>
      </div>
    </div>
  );
};

export default Sidebar;
