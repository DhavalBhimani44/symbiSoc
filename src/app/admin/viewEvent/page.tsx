"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import BasicCard from "@/components/BasicCard";

const page = () => {
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

    const handleDelete = async (eventId: any) => {
        try {
            await axios.delete('/api/event/deleteEvents', {
                data: {
                    eventId: eventId
                }
            });
            // Update the events state after successful deletion
            setEvents(events.filter(event => event.id !== eventId));
        } catch (error) {
            console.error('Error deleting event:', error);
        }
    };

    return (
        <>
            <div className='w-full h-full m-auto bg-white'>
                <div className="flex justify-around w-full z-10 top-14 sticky">
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
                            View Events
                        </Link>
                    </div>
                </div>
                <div className='flex flex-col h-screen items-center w-full bg-gradient-to-l from-blue-300 via-sky-200 to-blue-300' style={{ backgroundImage: 'url("/bg4.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100', width: '100' }}>
                    <div className="flxe flex-col w-full">
                        <div className="flex text-6xl w-full justify-center items-center text-white my-2">
                            <h1>Upcoming Events</h1>
                        </div>
                        <div className="flex text-4xl w-full">
                            <BasicCard userRole="incharge" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;