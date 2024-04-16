"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function InchargePage() {
    const router = useRouter();
    const [username, setUsername] = useState();
    const [totalRegistration, setTotalRegistration] = useState();
    const [loading, setLoading] = useState(true);
    const [event, setEvents] = useState();

    useEffect(() => {
        const userdata = async () => {
            try {
                const userresponse = await axios.get('/api/user/profile/getUserData');
                const regresponse = await axios.get('/api/user/profile/getRegistrationData');
                console.log("response: ", userresponse);
                setUsername(userresponse.data.username);
                console.log("response: ", regresponse);
                setTotalRegistration(regresponse.data.totalEvents);
                setLoading(false);
                const eventsresponse = await axios.get('/api/event/viewEvents');
                const currentDate = new Date();
                const upcoming = eventsresponse.data.filter((event: Event) => new Date(event.eventDate) > currentDate);
                const length = upcoming.length;
                setEvents(length);
            } catch (error) {
                console.log("error: ", error);
                setLoading(false);
            }
        };
        userdata();
    }, []);

    const logout = async () => {
        try {
            await axios.get('/api/user/sign-out');
            router.push('/sign-in');
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="flex w-full h-screen">
                <div className="flex flex-col w-1/4 z-10 top-14 sticky text-gray-300 bg-neutral-900">
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
                            <Link href="/incharge/registeredEvents" className="w-full hover:border-l-4 hover:border-blue-600 hover:text-blue-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Registered Events
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/incharge" className="w-full border-l-4 border-green-600 text-green-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex w-3/4 justify-around">
                    <div className="flex w-full justify-around my-6">
                        {loading ? (
                            <div className="text-4xl italic font-semibold">Is it really you ??</div>
                        ) : (
                            <div className="flex flex-col text-4xl slide-in font-serif">
                                <div className="flex justify-start flex-col">
                                    <div className="text-blue-500 text-6xl font-bold">Welcome back</div>
                                    <div className="font-semibold">{username}</div>
                                </div>

                                <div className="flex my-8 justify-start font-mono font-thin">
                                    <div className="text-blue-500 font-semibold">Total registered events : {totalRegistration}</div>
                                </div>

                                <div className="flex my-8 justify-start font-serif font-thin">
                                    <div>SIT has {event} upcoming event for you</div>
                                </div>

                                <div className="flex my-8 justify-start font-thin">
                                    <div className="italic">Hurry up! The seats are filling fast !!</div>
                                </div>
                            </div>
                        )}

                        <div className="flex">
                            <Button onClick={logout}>
                                Sign out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}