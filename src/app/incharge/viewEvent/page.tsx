"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import BasicCard from "@/components/BasicCard";
import Link from "next/link";

interface Event {
    id: number;
    eventId: number;
    eventName: string;
    eventDate: Date;
    eventDescription: string;
    organisingClub: string;
}

const Page = () => {
    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/event/viewEvents');
                const currentDate = new Date();
                const upcoming = response.data.filter((event: Event) => new Date(event.eventDate) > currentDate);
                const past = response.data.filter((event: Event) => new Date(event.eventDate) <= currentDate);
                setUpcomingEvents(upcoming);
                setPastEvents(past);
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
                <div className="flex flex-col w-1/4 z-10 top-14 sticky text-gray-300 bg-neutral-900 h-screen">
                    <div className="top-14 z-10 fixed w-1/4">
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/incharge/createEvent" className="w-full hover:border-l-4 hover:border-red-600 hover:text-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Create Event
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/incharge/viewEvent" className="w-full border-l-4 border-yellow-600 text-yellow-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                View Events
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/incharge/registeredEvents" className="w-full hover:border-l-4 hover:border-blue-600 hover:text-blue-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
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
                        <div className="flex text-6xl w-full justify-center items-center text-white my-2">
                            <h1>Upcoming Events</h1>
                        </div>
                        <div className="flex text-4xl w-full">
                            {loading ? (
                                <div>Loading...</div>
                            ) : upcomingEvents.length === 0 ? (
                                <div>No upcoming events</div>
                            ) : (
                                <div className={`w-full ${isVisible ? 'slide-in' : ''}`}>
                                    {upcomingEvents.map((event: Event) => (
                                        <BasicCard key={event.id} event={event} userRole="incharge" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex flex-col w-full">
                        <div className="flex text-6xl w-full justify-center items-center text-white my-2">
                            <h1>Past Events</h1>
                        </div>
                        <div className="flex text-4xl w-full">
                            {loading ? (
                                <div>Loading...</div>
                            ) : pastEvents.length === 0 ? (
                                <div>No past events</div>
                            ) : (
                                <div className={`w-full ${isVisible ? 'slide-in' : ''}`}>
                                    {pastEvents.map((event: Event) => (
                                        <BasicCard key={event.id} event={event} userRole="incharge" />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;
