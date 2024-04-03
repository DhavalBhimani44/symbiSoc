import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";

const UsersTab = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    userId: "", // Corrected the field name from 'username' to 'userId'
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
    } catch (error) {
      console.log('Error updating user: ', error);
    }
  }

  const handleSearch = () => {
    const result = users.filter(user =>
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResult(result);
  }

  return (
    <>
      <div className="w-full h-full">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by email"
            className="w-64 h-8 px-2"
          />
          <Button onClick={handleSearch}>Search</Button>
        </div>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>User Type</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="w-64 h-6"
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
                  className="w-64 h-6"
                  placeholder="Email"
                />
              </TableCell>
              <TableCell>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
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
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Username</TableCell>
              <TableCell>Email Address</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default UsersTab;
