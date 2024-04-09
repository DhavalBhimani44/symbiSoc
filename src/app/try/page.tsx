"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Card from "@mui/joy/Card";
import BasicCard from "@/components/BasicCard";
import UsersTab from "@/components/UsersTab";

const Page = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isopen, setIsopen] = useState(false);
    const [users, setUsers] = useState([]);

    const toggleDropdown = () => {
        setIsopen(true);
    }    

    const handleAdd = async (values: z.infer<typeof FormSchema>) => {
        try {
            await axios.post('/api/user/addUser', values);
            const response = await axios.get('/api/user/getUsers');
            const updatedUsers = response.data;

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

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/event/viewEvents');
                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching events:', error);
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <div className="flex w-full h-full">
                <div className="flex flex-col w-1/4 z-10 top-14 h-screen sticky text-slate-300 bg-neutral-900">
                    <div className="top-14 z-10 fixed w-1/4">
                        <div className="flex w-full">
                            <Link href="/incharge/createEvent" className="w-full hover:border-r-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Create Event
                            </Link>
                        </div>
                        <div className="flex w-full">
                            <Link href="/incharge/viewEvent" className="w-full border-r-4 border-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                View Events
                            </Link>
                        </div>
                        <div className="flex w-full">
                            <Link href="/incharge/registeredEvents" className="w-full hover:border-r-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Registered Events
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='w-3/4 px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-2 shadow-2xl text-gray-200 relative antialiased' style={{ backgroundImage: 'url("/bg4.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', height: 'screen', width: '100' }}>
                    <button onClick={toggleDropdown}>
                        Add user
                    </button>
                    {isopen && (
                        <div>
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
                    )}
                </div>
            </div>
        </>
    );
};

export default Page;