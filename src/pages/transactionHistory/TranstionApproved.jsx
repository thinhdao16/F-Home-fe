/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
// import { VariantProp, ColorPaletteProp } from '@mui/joy/styles';
import Box from "@mui/joy/Box";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import RadioGroup from "@mui/joy/RadioGroup";
import Radio from "@mui/joy/Radio";
import Table from "@mui/joy/Table";
import axios from "axios";
import { Tag } from "antd";

const TranstionApproved = () => {
  const [variant, setVariant] = useState("plain");
  const [color, setColor] = useState("neutral");
  const [pointUser, setPointUser] = useState([]);
  console.log(pointUser)
  const userPosting = JSON.parse(localStorage.getItem("access_token"));
  const calculateTotalPoint = () => {
    return pointUser.reduce((total, item) => total + (item.point || 0), 0);
  };

  // Ví dụ về cách sử dụng hàm tính tổng
  const totalPoint = calculateTotalPoint();
  console.log(totalPoint)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/getformpoint", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userPosting.data.accessToken}`,
          },
        });
        const data = response?.data?.data?.point;
        setPointUser(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const pointUserPending = useMemo(() => {
    if (!pointUser) return [];
    return pointUser?.filter((point) => point.status === "approved");
  }, [pointUser]);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className=" homeContainer-trans-point">
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 1,
              mb: 2,
              ml: 1,
            }}
          >
            <FormControl orientation="horizontal">
              <FormLabel>Variant:</FormLabel>
              <RadioGroup
                orientation="horizontal"
                value={variant}
                onChange={(event) => setVariant(event.target.value)}
              >
                <Radio label="plain" value="plain" />
                <Radio label="outlined" value="outlined" />
                <Radio label="soft" value="soft" />
                <Radio label="solid" value="solid" />
              </RadioGroup>
            </FormControl>
            <FormControl orientation="horizontal">
              <FormLabel>Color: </FormLabel>
              <Select
                size="sm"
                value={color}
                onChange={(event) => setColor(event.target.value)}
              >
                {[
                  "neutral",
                  "primary",
                  "danger",
                  "info",
                  "success",
                  "warning",
                ].map((item) => (
                  <Option key={item} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Table aria-label="table variants" variant={variant} color={color}>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Point</th>
                <th>Transfer Contents</th>
                <th>Progess</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(pointUserPending) &&
                pointUserPending
                  .sort((a, b) => {
                    return (
                      new Date(b?.updatedAt).getTime() -
                      new Date(a?.updatedAt).getTime()
                    );
                  })
                  ?.map((row) => (
                    <tr key={row?.fullname}>
                      <td>
                        <img
                          src={row?.user?.img}
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            border: "none",
                            borderRadius: "50%",
                          }}
                        />
                      </td>
                      <td>{row?.user?.fullname}</td>
                      <td>{row?.point}</td>
                      <td>{row?.user?.email}</td>
                      <td>
                        {" "}
                        <Tag color="green">Approved</Tag>
                      </td>
                    </tr>
                  ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default TranstionApproved;
