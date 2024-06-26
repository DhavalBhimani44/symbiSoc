"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import UpcomingBasicCard from "@/components/UpcomingBasicCard";
import PastBasicCard from "@/components/PastBasicCard";

const page = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);
    const [isopenupcoming, setIsopenupcoming] = useState(true);
    const [isopenpast, setIsopenpast] = useState(false);

    const toggleupcomingDropdown = () => {
        if (isopenupcoming) {
            setIsopenupcoming(false);
        } else {
            setIsopenupcoming(true);
        }
    }

    const togglepastDropdown = () => {
        if (isopenpast) {
            setIsopenpast(false);
        } else {
            setIsopenpast(true);
        }
    }

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
            <div className="flex w-full h-full">
                <div className="flex flex-col w-1/4 h-screen z-10 top-14 sticky text-gray-300 bg-neutral-900">
                    <div className="top-14 z-10 fixed w-1/4 font-mono">
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/faculty/createEvent" className="w-full hover:border-l-4 hover:border-red-600 hover:text-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Create Event
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/faculty/viewEvent" className="w-full border-l-4 border-yellow-600 text-yellow-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                View Events
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/faculty" className="w-full hover:border-l-4 hover:border-green-600 hover:text-green-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
                <div className='w-3/4 bg-fixed px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-4 shadow-2xl text-gray-200 relative antialiased' style={{ backgroundImage: 'url("/bg4.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100', width: '100' }}>
                    <div className="flex flex-col w-full">
                        <div className="flex text-6xl w-full justify-center items-center text-white my-2">
                            <Button className="text-2xl sm:text-xl md:text-2xl lg:text-4xl text-emerald-600 hover:text-gray-200 xl:text-6xl w-fit h-fit bg-transparent hover:bg-emerald-700 shadow-sky-500 font-serif" onClick={toggleupcomingDropdown}>Upcoming Events</Button>
                        </div>
                        {isopenupcoming &&
                            <div className="flex text-4xl w-full">
                                <div className={`w-full ${isVisible ? 'slide-in' : ''}`}>
                                    <UpcomingBasicCard userRole="incharge" />
                                </div>
                            </div>
                        }
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex text-6xl w-full justify-center items-center text-white my-2">
                            <Button className="text-2xl sm:text-xl md:text-2xl lg:text-4xl text-emerald-600 hover:text-gray-200 xl:text-6xl w-fit h-fit bg-transparent hover:bg-emerald-700 font-serif" onClick={togglepastDropdown}>Past Events</Button>
                        </div>
                        {isopenpast &&
                            <div className="flex text-4xl w-full">
                                <div className={`w-full ${isVisible ? 'slide-in' : ''}`}>
                                    <PastBasicCard userRole="incharge" />
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;