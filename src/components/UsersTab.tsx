import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "./ui/button";

const UsersTab = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        userType: ""
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

    const handleEdit = (user:any) => {
        setFormData({
            userId: user.userId,
            username: user.username,
            email: user.email,
            userType: user.userType
        });
    }

    const handleChange = (e:any) => {
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
    
    return (
        <>
            <div className="w-full h-full">
                <div className="w-full flex flex-col rounded-lg">
                    <div className="w-full flex-col bg-neutral-900">
                        <div className="bg-red-100 w-full flex justify-evenly">
                            <div className="flex justify-center items-center">Username</div>
                            <div className="flex justify-center items-center">Email Address</div>
                            <div className="flex justify-center items-center">User Type</div>
                        </div>
                        <div className="bg-blue-100 w-full flex">
                            <form onSubmit={() => handleSubmit(formData.userId)} className="flex justify-evenly text-black">
                                <div className="flex mx-4">
                                    <input
                                        type="text"
                                        id="id"
                                        name="id"
                                        value={formData.userId}
                                        onChange={handleChange}
                                        className="w-64 h-6"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="flex mx-4">
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        className="w-64 h-6"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="flex mx-4">
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-64 h-6"
                                        placeholder="Email"
                                    />
                                </div>
                                <div className="flex mx-4">
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
                                </div>
                                <div>
                                    <Button type="submit">Submit</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="w-full flex justify-evenly bg-neutral-900">
                        <div className="flex justify-center items-center">Username</div>
                        <div className="flex justify-center items-center">Email Address</div>
                        <div className="flex justify-center items-center">User Type</div>
                    </div>
                    <div className="w-full flex justify-evenly bg-slate-200 text-black">
                        <ul className="w-full">
                            <div className="flex flex-col w-full">
                                {users.map((user) => (
                                    <li key={user.userId} className="flex justify-evenly w-full">
                                        <div className="flex justify-center items-center">{user.userId}</div>
                                        <div className="flex justify-center items-center">{user.username}</div>
                                        <div className="flex justify-center items-center">{user.email}</div>
                                        <div className="flex justify-center items-center">{user.userType}</div>
                                        <div className="flex justify-center items-center">
                                            <Button onClick={() => handleEdit(user)}>Edit</Button>
                                        </div>
                                    </li>
                                ))}
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UsersTab;
