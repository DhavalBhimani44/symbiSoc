"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';

const page = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/user/viewEvents');
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
                <div className="flex justify-around w-full">
                    <div className="flex w-1/3 bg-red-100">
                        <Link href="/admin/roleManagement" className="w-full hover:border-b-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Role Management
                        </Link>
                    </div>
                    <div className="flex w-1/3 bg-red-100">
                        <Link href="/admin/createEvent" className="w-full hover:border-b-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Create Event
                        </Link>
                    </div>
                    <div className="flex w-1/3 bg-blue-100">
                        <Link href="/admin/viewEvent" className="w-full border-b-4 border-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            View Event
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center w-full mt-6 bg-gradient-to-l from-blue-300 via-sky-200 to-blue-300'>
                    <div className="flxe flex-col">
                        <div className="flex text-6xl">
                            <h1>Event List</h1>
                        </div>
                        <div className="flex text-4xl">
                            <ul>
                                <div className="flex flex-col">
                                    {events.map((event) => (
                                        <li key={event.id}>
                                            <div className="">Event Name: {event.eventName}</div>
                                            <div>Event Description: {event.eventDescription}</div>
                                            <div>Organising CLub: {event.organisingClub}</div>
                                        </li>
                                    ))}
                                </div>
                            </ul>
                        </div>
                    </div>
                </div>                
            </div>
        </>
    );
};

export default page;