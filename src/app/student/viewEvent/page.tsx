"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import BasicCard from "@/components/BasicCard";

const Page = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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

    const handleRegister = async (eventId: number) => {
        try {
            const uid = await axios.get('/api/user/idfetch');
            const username = await axios.get('/api/user/idfetch');

            // Validate userId

            if (!uid || !username) {
                console.error('User ID or username is not provided.');
                return;
            }

            await axios.post('/api/event/eventregistration', { uid, username, eventId });
            router.push('/student/registeredEvents');
        } catch (error) {
            console.error('Error registering event:', error);
        }
    };

    return (
        <>
            <div className="flex w-full h-screen">
                <div className="flex flex-col w-1/4 z-10 top-14 sticky text-slate-300 bg-neutral-900">
                    <div className="top-14 z-10 fixed w-1/4">
                        <div className="flex w-full">
                            <Link href='/student/viewEvent' className="w-full border-r-4 border-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                View Events
                            </Link>
                        </div>
                        <div className="flex w-full">
                            <Link href='/student/registeredEvents' className="w-full hover:border-r-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Registered Events
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='w-3/4 h-full bg-fixed px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-2 shadow-2xl text-gray-200 relative antialiased' style={{ backgroundImage: 'url("/bg4.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100', width: '100' }}>
                    <div className="flex flex-col w-full">
                        <div className="flex text-6xl w-full justify-center items-center text-white">
                            <h1>Event List</h1>
                        </div>
                        <div className="flex text-4xl w-full">
                            {loading ? (
                                <div>Loading...</div>
                            ) : events.length === 0 ? (
                                <div>No upcoming events.</div>
                            ) : (
                                <BasicCard userRole="student" />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
