"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from "next/navigation";
import UpcomingBasicCard from "@/components/UpcomingBasicCard";
import { Button } from "@/components/ui/button";

const Page = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);
    const [isopenupcoming, setIsopenupcoming] = useState(true);    

    const toggleupcomingDropdown = () => {
        if (isopenupcoming) {
            setIsopenupcoming(false);
        } else {
            setIsopenupcoming(true);
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
        <><div className="flex w-full h-full">
            <div className="flex flex-col w-1/4 h-screen z-10 top-14 sticky text-gray-300 bg-neutral-900">
                <div className="top-14 z-10 fixed w-1/4 font-mono">
                    <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                        <Link href='/student/viewEvent' className="w-full border-l-4 border-red-600 text-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            View Events
                        </Link>
                    </div>
                    <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                        <Link href='/student/registeredEvents' className="w-full hover:border-l-4 hover:border-yellow-600 hover:text-yellow-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Registered Events
                        </Link>
                    </div>
                    <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                        <Link href="/student" className="w-full hover:border-l-4 hover:border-green-600 hover:text-green-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Profile
                        </Link>
                    </div>
                </div>
            </div>
            <div className='w-3/4 bg-fixed px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-2 shadow-2xl text-gray-200 relative antialiased' style={{ backgroundImage: 'url("/bg4.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100', width: '100' }}>
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
            </div>
        </div>
        </>
    );
};

export default Page;
