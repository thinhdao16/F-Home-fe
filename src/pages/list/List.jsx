import React, { useEffect, useMemo, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import "./list.scss";
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

const List = () => {
  const [] = useState([]);

  const [users, setUsers] = useState({
    userss: [],
  });
  const arrUsers = useMemo(() => {
    if (!users) return [];
    return users?.userss?.filter((users) => users.status === false);
  }, [users]);
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
        return {
          ...users,
          pointEmailImg,
          pointtDescription,
          pointPlus,
          pointId
        };
      });
      setUsers({
        userss: newData,
      });
    };

    fetchUsers();
  }, []);


  const handlePutUser = (id) => {
    console.log(id);
    axios
      .put(`https://f-home-be.vercel.app/setUserStatus/${id?._id}`, {
        status: true,
        roleName: "landlord",
      })
      .then((response) => {
        // Assuming the response.data contains the updated data after the PUT request
        // Update state to re-render the component
      
        axios
          .put(
            "https://f-home-be.vercel.app/pointplusEmail",
            {
              email: id?.email,
              point: id?.pointPlus,
              pointId: id?.pointId,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((secondResponse) => {
            // Handle the response of the second API call here
            // You can perform any additional actions based on the second API response
          })
          .catch((secondError) => {
            console.error(secondError);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  
  const handleDeleteUser = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`https://f-home-be.vercel.app/deleteUser/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          // update state to re-render the component
          setUsers((prevData) => {
            const filteredData = prevData.filter((item) => item._id !== id);
            return filteredData;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const [variant, setVariant] = useState("plain");
  const [color, setColor] = useState("neutral");
  return (
    <>
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
                  <th>Email</th>
                  <th>Point</th>
                  <th>Transaction</th>
                  <th>Sure</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(arrUsers) &&
                  arrUsers
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
                        </td>
                        <td>{row?.fullname}</td>
                        <td>{row?.email}</td>
                        <td>{row?.pointPlus}</td>
                        <img
                          src={row?.pointEmailImg}
                          alt=""
                          style={{
                            width: 60,
                            height: 60,
                            objectFit: "cover",
                            border: "none",
                            borderRadius: "50%",
                          }}
                        />
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handlePutUser(row)}
                          >
                            Yes
                          </button>{" "}
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteUser(row?._id)}
                          >
                            No
                          </button>
                        </td>
                      </tr>
                    ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default List;
