import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./new.scss";
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

const New = () => {
  const [variant, setVariant] = useState("plain");
  const [color, setColor] = useState("neutral");
  const [pointUser, setPointUser] = useState([]);
  const [loader, setLoader] = useState(null);
  const userPosting = JSON.parse(localStorage.getItem("access_token"));
  const [users, setUsers] = useState({
    userss: [],
  })
  // console.log(users)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://f-home-be.vercel.app/getformpoint",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userPosting.data.accessToken}`,
            },
          }
        );
        const data = response?.data?.data?.point;
        setPointUser(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [loader]);
  useEffect(() => {
    const fetchUsers = async () => {
      const responses = await Promise.all([
        axios.get("https://f-home-be.vercel.app/getAllUsers"),
        axios.get("https://f-home-be.vercel.app/getformpointEmail"),
      ]);
      const userss = responses[0].data;
      const pointWait = responses[1].data.data.point;
      const newData = userss.map((users) => {
        const points = pointWait.find((b) => b.email === users.email);
        const pointEmailImg = points ? points.img : "";
        const pointtDescription = points ? points.script : "";
        const pointPlus = points ? points.point : "";
        const pointId = points ? points._id : "";
        const pointStatus = points ? points.status : "";
        return {
          ...users,
          pointEmailImg,
          pointtDescription,
          pointPlus,
          pointId,
          pointStatus
        };
      });
      setUsers({
        userss: newData,
      });
    };

    fetchUsers();
  }, []);
  const handlePublish = (event, point, id, pointId) => {
    event.preventDefault();
    console.log(pointId);
    if (window.confirm("Are you sure you want to approved this user?")) {
      axios
        .put(
          `https://f-home-be.vercel.app/pointplus/${id}`,
          {
            point: point,
            pointId: pointId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userPosting.data.accessToken}`,
            },
          }
        )
        .then((response) => {
          // Update the state to render the component again
          setLoader((prevData) => !prevData);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const handleApproved = (id) => {
    fetch(`https://f-home-be.vercel.app/rejectedPoint/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userPosting.data.accessToken}`,
      },
      body: JSON.stringify({
        status: "rejected",
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoader((prevData) => !prevData);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const pointUserPending = useMemo(() => {
    if (!pointUser) return [];
    return pointUser?.filter((point) => point.status === "pending");
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
                <th>Sure</th>
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
                          alt=""
                        />
                      </td>
                      <td>{row?.user?.fullname}</td>
                      <td>{row?.point}</td>
                      <img
                        src={row?.img}
                        style={{
                          width: 60,
                          height: 60,
                          objectFit: "cover",
                          border: "none",
                          borderRadius: "50%",
                        }}
                        alt=""
                      />
                      <td>{row?.script}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={(event) =>
                            handlePublish(
                              event,
                              row?.point,
                              row?.user?._id,
                              row?._id
                            )
                          }
                        >
                          Welcome
                        </button>
                        <button
                          type="button"
                          className="btn btn-danger btn-sm"
                          onClick={() => handleApproved(row?._id)}
                        >
                          Delete
                        </button>
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

export default New;
