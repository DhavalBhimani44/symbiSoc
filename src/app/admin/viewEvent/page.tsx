"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import BasicCard from "@/components/BasicCard";

const page = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    })

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
            <div className='w-full h-full flex'>
                <div className="flex flex-col w-1/4 h-screen z-10 top-14 sticky text-gray-300 bg-neutral-900">
                    <div className="top-14 z-10 fixed w-1/4">
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/admin/roleManagement" className="w-full hover:border-l-4 hover:border-red-600 hover:text-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Role Management
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/admin/createEvent" className="w-full hover:border-l-4 hover:border-yellow-600 hover:text-yellow-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Create Event
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/admin/viewEvent" className="w-full border-l-4 border-blue-600 text-blue-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                View Events
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='w-3/4 bg-fixed px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-2 shadow-2xl text-gray-200 relative antialiased' style={{ backgroundImage: 'url("/bg4.jpg")', backgroundPosition: 'center', backgroundSize: 'cover', height: '1000', width: '1000' }}>
                    <div className="flex flex-col w-full">
                        <div className="flex text-6xl w-full h-full justify-center items-center text-white">
                            Upcoming Events
                        </div>
                        <div className="flex text-4xl w-full h-full">
                            {loading ? (
                                <div>Loading...</div>
                            ) : events.length === 0 ? (
                                <div>No upcoming events</div>
                            ) : (
                                <div className={`w-full ${isVisible ? 'slide-in' : ''}`}>
                                    <BasicCard userRole="incharge" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;