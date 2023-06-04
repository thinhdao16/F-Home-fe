import React, { useEffect, useMemo, useState } from 'react';
import Sidebar from '../../components/sidebar/Sidebar';
import './list.scss';
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

const List = () => {
  const [users, setUsers] = useState([]);

  const arrUsers = useMemo(() => {
    if (!users) return [];
    return users?.filter(
      (users) => users.status === false
    );
  }, [users]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3000/getAllUsers');
        const data = response.data;
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handlePutUser = (id) => {
    fetch(`http://localhost:3000/setUserStatus/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: true,
        roleName: 'landlord',
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        // update state to re-render the component
        setUsers((prevData) => {
          const updatedData = prevData.filter((item) => item._id !== id);
          return updatedData;
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      fetch(`http://localhost:3000/deleteUser/${id}`, {
        method: 'DELETE',
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
                  <th>Name</th>
                  <th >Email</th>
                  <th>PhoneNumber</th>
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
                    })?.map((row) => (
                      <tr key={row?.fullname}>
                        <td><img src={row?.img} style={{ width: 60, height: 60, objectFit: 'cover', border: 'none', borderRadius: '50%' }} /></td>
                        <td>{row?.fullname}</td>
                        <td>{row?.email}</td>
                        <td>{row?.phoneNumber}</td>
                        <td>
                          <button
                            type="button"
                            className="btn btn-primary btn-sm"
                            onClick={() => handlePutUser(row?._id)}
                          >
                            Welcome
                          </button>{" "}
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            onClick={() => handleDeleteUser(row?._id)}
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
    </>
  );
};

export default List;
