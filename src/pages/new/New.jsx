import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './new.scss';
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

const New = () => {
  const [variant, setVariant] = useState('plain');
  const [color, setColor] = useState('neutral');
  const [pointUser, setPointUser] = useState([])
  const userPosting = JSON.parse(localStorage.getItem("access_token"));

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getformpoint', {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userPosting.data.accessToken}`,
          },
        });
        const data = response?.data?.data?.point;
        setPointUser(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handlePublish = (event, point, id, pointId) => {
    event.preventDefault();
    console.log(pointId)
    if (window.confirm('Are you sure you want to delete this user?')) {
      axios
        .put(`http://localhost:3000/pointplus/${id}`, {
          point: point,
          pointId: pointId
        }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userPosting.data.accessToken}`
          }
        })
        .then((response) => {
          // Update the state to render the component again
          setPointUser((prevData) => {
            const updatedData = prevData.filter((item) => item._id === id);
            return updatedData;
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };


  const handleApproved = (id) => {
    fetch(`http://localhost:3000/deleteformpoint/${id}`, {
      method: 'DELETE',
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
        setPointUser((prevData) => {
          const updatedData = prevData.filter((item) => item._id === id);
          return updatedData;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
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
                <th>Name</th>
                <th>Point</th>
                <th>Transfer Contents</th>
                <th>Sure</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(pointUser) &&
                pointUser
                  .sort((a, b) => {
                    return (
                      new Date(b?.updatedAt).getTime() -
                      new Date(a?.updatedAt).getTime()
                    );
                  })?.map((row) => (
                    <tr key={row?.fullname}>
                      <td><img src={row?.user?.img} style={{ width: 60, height: 60, objectFit: 'cover', border: 'none', borderRadius: '50%' }} /></td>
                      <td>{row?.user?.fullname}</td>
                      <td>{row?.point}</td>
                      <td>{row?.user?.email}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm"
                          onClick={(event) => handlePublish(event, row?.point, row?.user?._id, row?._id)}
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
  )
}

export default New