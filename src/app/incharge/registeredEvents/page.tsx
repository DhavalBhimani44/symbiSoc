"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import RegisteredBasicCard from "@/components/RegisteredBasicCard";
import React, { useState, useEffect } from "react";

export default function InchargePage() {
    const router = useRouter();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, [])

    useEffect(() => {
        const registeredEvents = async () => {
            try {
                const response = await axios.get('/api/event/registeredEvents');
                setEvents(response.data);
                setLoading(false);
            } catch (error) {
                console.log('Error fetching registered events: ', error);
                setLoading(false);
            }
        };
        registeredEvents();
    }, []);

    return (
        <>
            <div className="flex w-full h-full">
                <div className="flex flex-col w-1/4 h-screen z-10 top-14 sticky text-gray-300 bg-neutral-900">
                    <div className="top-14 z-10 fixed w-1/4 font-mono">
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/incharge/createEvent" className="w-full hover:border-l-4 hover:border-red-600 hover:text-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Create Event
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/incharge/viewEvent" className="w-full hover:border-l-4 hover:border-yellow-600 hover:text-yellow-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                View Events
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/incharge/registeredEvents" className="w-full border-l-4 border-blue-600 text-blue-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Registered Events
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/incharge" className="w-full hover:border-l-4 hover:border-green-600 hover:text-green-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='w-3/4 bg-fixed px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-4 shadow-2xl text-gray-200 relative antialiased' style={{ backgroundImage: 'url("/bg4.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100', width: '100' }}>
                    <div className="flex flex-col w-full">
                        <div className="flex text-6xl w-full justify-center items-center text-white">
                            <h1 className="text-2xl sm:text-xl md:text-2xl lg:text-4xl px-4 py-2 rounded-md transition ease-in-out duration-400 text-emerald-600 hover:text-gray-200 xl:text-6xl w-fit h-fit bg-transparent hover:bg-emerald-700 shadow-sky-500 font-serif">Registered Events</h1>
                        </div>
                        <div className="flex text-4xl w-full">
                            {loading ? (
                                <div>Loading...</div>
                            ) : events.length === 0 ? (
                                <div>No registered events</div>
                            ) : (
                                <div className={`w-full ${isVisible ? 'slide-in' : ''}`}>
                                    <RegisteredBasicCard />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}