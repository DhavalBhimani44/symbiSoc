"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';
import TokenNavbar from "@/components/TokenNavbar";

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
                <div className="flex justify-around">
                    <div className="flex">
                        <div className='flex justify-center items-center p-1 lg:p-2 xl:p-2 hover:border-b-4 hover:border-red-400 hover:p-2 w-36 md:w-48 lg:w-64 xl:w-64'>
                            <Link href='/incharge/createEvent'>
                                <div className='text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl w-full'>
                                    Create Event
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="flex">
                        <div className='flex justify-center items-center border-b-4 border-red-600 w-36 md:w-48 lg:w-64 xl:w-64 p-1 lg:p-2 xl:p-2'>
                            <Link href='/incharge/viewEvent'>
                                <div className='text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl w-full'>
                                    View Events
                                </div>
                            </Link>
                        </div>
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