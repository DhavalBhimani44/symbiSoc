"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TokenNavbar from "@/components/TokenNavbar";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import RegisteredBasicCard from "@/components/RegisteredBasicCard";

export default function StudentPage() {
    const router = useRouter();
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const registeredEvents = async () => {
            try {
                const response = await axios.get('/api/event/registeredEvents');
                setEvents(response.data);
            } catch (error) {
                console.log('Error fetching registered events: ', error);
            }
        };
        registeredEvents();
    }, []);

    return (
        <>

            <div className='w-full h-full m-auto'>
                <div className="flex justify-around w-full">
                    <div className="flex w-1/2 bg-red-100">
                        <Link href="/student/viewEvent" className="w-full hover:border-b-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            View Events
                        </Link>
                    </div>
                    <div className="flex w-1/2 bg-blue-100">
                        <Link href="/student/registeredEvents" className="w-full border-b-4 border-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Registered Events
                        </Link>
                    </div>
                </div>

                <div className='w-full h-full bg-fixed lg:w-full xl:w-full px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-2 shadow-2xl text-gray-200 relative antialiased' style={{ backgroundImage: 'url("/bg4.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100', width: '100' }}>
                    <div className="flex flex-col w-full">
                        <div className="flex text-6xl w-full justify-center items-center text-white">
                            <h1>Registered Events</h1>
                        </div>
                        <div className="flex text-4xl w-full">
                            <RegisteredBasicCard />
                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}