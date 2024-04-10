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
  const [isopen, setIsopen] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleDropdown = () => {
    if (isopen) {
      form.reset();
      setIsopen(false);
    } else {
      setIsopen(true);
    }
  }

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
        setLoading(false);
      } catch (error) {
        console.log('Error fetching users: ', error);
        setLoading(false);
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
      setIsopen(false);
    } catch (error) {
      console.log('Error updating user: ', error);
    }
  }

  const handleDelete = async (user: User) => {
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
      const response = await axios.get('/api/user/getUsers');
      const updatedUsers = response.data;
      setIsopen(false);
      // Update the users state with the updated list
      setUsers(updatedUsers);
      form.reset();
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
        <div className="flex flex-wrap justify-between mb-4 w-full">
          <div className="flex flex-wrap w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 my-0 sm:my-4 md:my-4 lg:my-0 xl:my-0">
            <div className="w-full flex justify-end items-center sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 mx-0 sm:mx-2 md:mx-2 lg:mx-0 xl:mx-0 my-0 sm:my-2 md:my-2 lg:my-0 xl:my-0">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by email"
                className="w-64 h-8 px-2 text-black rounded-md"
              />
            </div>
            <div className="w-full flex items-center sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 sm:mx-2 md:mx-2 lg:mx-0 xl:mx-0">
              <Button onClick={handleSearch}>Search</Button>
            </div>
          </div>

          <div className="flex w-full sm:w-full md:w-full lg:w-1/2 xl:w-1/2 justify-center items-center">
            <div className="flex flex-col mb-4 w-full sm:w-full md:w-full lg:w-4/5 xl:w-4/5">
              <Button onClick={toggleDropdown} className="flex justify-center items-center z-10">
                Add user Tab
              </Button>
              {isopen &&
                <div className="flex justify-center items-center bg-neutral-900 rounded-md py-4 px-2 slide-down">
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
                              <FormLabel><div className='lg:text-xl sm:text-lg flex w-1/2'>Password</div></FormLabel>
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

                      <div className="flex w-1/4">
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
                          className='w-full flex justify-center items-center text-md shadow-indigo-500/50 hover:shadow-indigo-500/50 shadow-sm hover:shadow-md bg-gradient-to-br from-fuchsia-500 to-cyan-500 hover:bg-gradient-to-tl hover:from-fuchsia-500 hover:to-cyan-500 transition duration-300 ease-in-out'
                          type='submit'
                        >
                          <div className="w-full flex justify-center items-center">Add User</div>
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>}
            </div>
          </div>
        </div>

        <div className="flex justify-between mb-8 mt-8">
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
          {loading ? ( 
            <div>Loading</div>
          ) : (<Table>
            <TableBody className="w-full">
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Email Address</TableCell>
                <TableCell>User Type</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
              {searchResult.length > 0 ? searchResult.map((user: User) => (
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
          </Table>)}
        </div>
      </div>
    </>
  );
}

export default UsersTab;
