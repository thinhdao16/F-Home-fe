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

const TranstionReject = () => {
  const [variant, setVariant] = useState("plain");
  const [color, setColor] = useState("neutral");
  const [pointUser, setPointUser] = useState([]);
  const userPosting = JSON.parse(localStorage.getItem("access_token"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("https://f-home-be.vercel.app/getformpoint", {
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
    return pointUser?.filter((point) => point.status === "rejected");
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
                <th>ImgTrans</th>
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
                          alt=""
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
                      <img
                          src={row?.img}
                          alt=""
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            border: "none",
                            borderRadius: "50%",
                          }}
                        />
                      <td>{row?.script}</td>
                      <td>
                      <Tag color="magenta">Rejected</Tag>
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

export default TranstionReject;
