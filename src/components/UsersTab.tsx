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
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from '@/components/ui/select';
import { useToast } from "@/components/ui/use-toast";
import { FormSchema } from '@/app/validationSchema';
import 'react-toastify/dist/ReactToastify.css';

type FormSchema = z.infer<typeof FormSchema>

interface User {
  userId: string;
  username: string;
  email: string;
  userType: string;
}

interface ChangeEvent {
  target: {
    name: string;
    value: string;
  };
}


const UsersTab = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [formData, setFormData] = useState({
    userId: "",
    username: "",
    email: "",
    userType: ""
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<User[]>([]);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      userType: 'STUDENT',
    },
  });

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

  const handleEdit = (user: User) => {
    setFormData({
      userId: user.userId,
      username: user.username,
      email: user.email,
      userType: user.userType
    });
  }

  const handleChange = (e: ChangeEvent) => {
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
        userId: "",
        username: "",
        email: "",
        userType: "",
      })
    } catch (error) {
      console.log('Error updating user: ', error);
    }
  }

  const handleDelete = async (user:User) => {
    try {
      const userId = user.userId;
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

  const handleAdd = async (values: z.infer<typeof FormSchema>) => {
    try {
      await axios.post('/api/user/addUser', values);
      toast({
        duration: 2000,
        description: 'User added successfully'
      })
    } catch (error: any) {
      toast({
        duration: 2000,
        description: 'Error adding user'
      })
      console.log("Following user")
    }
    console.log(values);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleAdd)}>
              <div className="flex w-1/4">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel><div className='lg:text-xl sm:text-lg'>Username</div></FormLabel>
                      <FormControl>
                        <Input className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200 text-black' placeholder='Username' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-1/4">
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel><div className='lg:text-xl sm:text-lg'>Email</div></FormLabel>
                      <FormControl>
                        <Input className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200 text-black' placeholder='mail@sitpune.edu.in' {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-1/4">
                <FormField
                  control={form.control}
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel><div className='lg:text-xl sm:text-lg'>Password</div></FormLabel>
                      <FormControl>
                        <Input
                          type='password'
                          className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200 text-black'
                          placeholder='Enter your password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-full">
                <FormField
                  control={form.control}
                  name='confirmPassword'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel><div className='lg:text-xl sm:text-lg'>Re-enter Password</div></FormLabel>
                      <FormControl>
                        <Input
                          placeholder='Re-Enter your password'
                          className='w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200 text-black'
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-1/4">
                <FormField
                  control={form.control}
                  name='userType'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel><div className='lg:text-xl sm:text-lg'>User Type</div></FormLabel>
                      <FormControl>
                        <Select {...field} onValueChange={(selectedValue) => form.setValue('userType', selectedValue)}>
                          <SelectTrigger className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg bg-slate-200 text-black">
                            <SelectValue placeholder="User type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="STUDENT">Student</SelectItem>
                            <SelectItem value="FACULTY">Faculty</SelectItem>
                            <SelectItem value="CLUBINCHARGE">Club Incharge</SelectItem>
                            <SelectItem value="ADMIN">Admin</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex w-1/4">
                <Button
                  className='w-max text-md shadow-indigo-500/50 hover:shadow-indigo-500/50 shadow-md hover:shadow-lg bg-gradient-to-br from-fuchsia-500 to-cyan-500 hover:bg-gradient-to-tl hover:from-fuchsia-500 hover:to-cyan-500 transition duration-300 ease-in-out'
                  type='submit'
                >
                  Add User
                </Button>
              </div>
            </form>
          </Form>
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
              {searchResult.length > 0 ? searchResult.map((user:User) => (
                <TableRow key={user.userId}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.userType}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleEdit(user)}>Edit</Button>
                  </TableCell>
                </TableRow>
              )) : users.map((user: User) => (
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
