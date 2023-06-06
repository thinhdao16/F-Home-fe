import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
// import './list.scss';
// import { VariantProp, ColorPaletteProp } from '@mui/joy/styles';
import Box from '@mui/joy/Box';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import RadioGroup from '@mui/joy/RadioGroup';
import Radio from '@mui/joy/Radio';
import Table from '@mui/joy/Table';
import axios from 'axios';

const Single = () => {
  const [postings, setPostings] = useState([]);
  const arrPostPeding = useMemo(() => {
    if (!postings) return [];

    return postings?.filter(
      (posting) =>
        posting?.status === "pending"
    );
  }, [postings]);

  const userPosting = JSON.parse(localStorage.getItem("access_token"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/posts',
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userPosting.data.accessToken}`,
            },
          });
        const data = response?.data?.data?.postings;
        setPostings(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleApproved = (id) => {
    fetch(`http://localhost:3000/posts/setapprove/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userPosting.data.accessToken}`,
      },
      body: JSON.stringify({
        status: "approved"
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // update state to re-render the component
        setPostings((prevData) => {
          const updatedData = prevData.filter((item) => item._id !== id);
          return updatedData;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePublish = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      console.log(id)
      fetch(`http://localhost:3000/posts/setapprovepublish/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userPosting.data.accessToken}`,
        },
        body: JSON.stringify({
          status: "published"
        }),
      })
        .then((res) => res.json())
        .then((result) => {
          // update state to re-render the component
          setPostings((prevData) => {
            const updatedData = prevData.filter((item) => item._id !== id);
            return updatedData;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  const [variant, setVariant] = useState('plain');
  const [color, setColor] = useState('neutral');
  return (
    <>
      <div className='home'>
        <Sidebar />
        <div className="homeContainer">
          <div>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
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
                  {['neutral', 'primary', 'danger', 'info', 'success', 'warning'].map(
                    (item) => (
                      <Option key={item} value={item}>
                        {item}
                      </Option>
                    ),
                  )}
                </Select>
              </FormControl>
            </Box>
            <Table aria-label="table variants" variant={variant} color={color}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Room</th>
                  <th>Author</th>
                  <th>Title</th>
                  <th>Sure</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(arrPostPeding) &&
                  arrPostPeding
                    .sort((a, b) => {
                      return (
                        new Date(b?.updatedAt).getTime() -
                        new Date(a?.updatedAt).getTime()
                      );
                    })?.map((row) => (
                      <tr key={row?.fullname}>
                        <td><img src={row?.img} style={{ width: 60, height: 60, objectFit: 'cover', border: 'none', borderRadius: '50%' }} /></td>
                        <td>{row?.rooms?.roomName}</td>
                        <td>{row?.userPosting?.fullname}</td>
                        <td>{row?.title}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handlePublish(row?._id)}
                          >
                            Welcome
                          </button>{" "}
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleApproved(row?._id)}
                          >
                            Wait
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

export default Single;
