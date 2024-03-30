"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import Card from "@mui/joy/Card";
import BasicCard from "@/components/BasicCard";

const Page = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/event/viewEvents');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <>
            <div className='w-full h-full m-auto bg-white'>
                <div className="flex justify-around w-full z-10 top-14 sticky">
                    <div className="flex w-1/3 bg-red-100">
                        <Link href="/incharge/createEvent" className="w-full hover:border-b-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Create Event
                        </Link>
                    </div>
                    <div className="flex w-1/3 bg-blue-100">
                        <Link href="/incharge/viewEvent" className="w-full border-b-4 border-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            View Events
                        </Link>
                    </div>
                    <div className="flex w-1/3 bg-red-100">
                        <Link href="/incharge/registeredEvents" className="w-full hover:border-b-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Registered Events
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col items-center h-screen w-full bg-gradient-to-l from-blue-300 via-sky-200 to-blue-300 bg-fixed' style={{ backgroundImage: 'url("/bg4.jpg")', backgroundPosition:'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100', width: '100'} }>
                    <div className="flxe flex-col w-full">
                        <div className="flex text-6xl w-full justify-center items-center text-white my-2">
                            <h1>Event List</h1>
                        </div>
                        <div className="flex text-4xl w-full">
                            <BasicCard userRole="incharge"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
