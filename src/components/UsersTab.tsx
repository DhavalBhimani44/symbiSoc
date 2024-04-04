"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    email: "",
    userType: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/user/getUsers');
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.log('Error fetching users: ', error);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setFormData({
      userId: user.userId,
      username: user.username,
      email: user.email,
      userType: user.userType
    });
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  const handleSubmit = async () => {
    try {
      const response = await axios.put(`/api/user/updateUsers`, formData);
      const updatedUser = response.data.data;
      setUsers(users.map(user => user.userId === updatedUser.userId ? updatedUser : user));
      setFormData({
        userId: null,
        username: "",
        email: "",
        userType: "",
      })
    } catch (error) {
      console.log('Error updating user: ', error);
    }
  }

  const handleDelete = async (user) => {
    try {
      const userId = await user.userId;
      console.log("user id: ", userId);
      await axios.delete('/api/user/deleteUser', {
        data: {
          userId: userId
        }
      });
      // Update the users state after successful deletion
      setUsers(users.filter(user => user.userId !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleSearch = () => {
    const result = users.filter(user =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  }

  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-between mb-4 w-full">
          <div className="w-1/2 flex justify-end mx-1 items-center">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by email"
              className="w-64 h-8 px-2 text-black rounded-md"
            />
          </div>
          <div className="w-1/2 flex mx-1 items-center">
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        <div className="flex justify-between mb-4">
          <Table className="w-full">
            <TableBody className="w-full">
              <TableRow>
                <TableCell className="w-1/4">Username</TableCell>
                <TableCell className="w-1/4">Email Address</TableCell>
                <TableCell className="w-1/4">User Type</TableCell>
                <TableCell className="w-1/4">Action</TableCell>
              </TableRow>
              <TableRow className="text-black">
                <TableCell>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-64 h-8 p-1 rounded-md"
                    placeholder="Username"
                  />
                </TableCell>
                <TableCell>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-64 h-8 p-1 rounded-md"
                    placeholder="Email"
                  />
                </TableCell>
                <TableCell>
                  <select
                    id="userType"
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-64 h-8 p-1 rounded-md"
                  >
                    <option value="STUDENT">Student</option>
                    <option value="FACULTY">Faculty</option>
                    <option value="CLUBINCHARGE">Club Incharge</option>
                    <option value="ADMIN">Admin</option>
                  </select>
                </TableCell>
                <TableCell>
                  <Button onClick={handleSubmit}>Submit</Button>
                </TableCell>                
              </TableRow>
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between mb-4">
          <Table>
            <TableBody className="w-full">
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
              {searchResult.length > 0 ? searchResult.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                  </TableCell>
                </TableRow>
              )) : users.map((user) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => handleDelete(user)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
}

export default UsersTab;
