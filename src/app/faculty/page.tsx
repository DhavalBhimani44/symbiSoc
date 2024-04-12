"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function FacultyPage() {
    const router = useRouter();
    const [username, setUsername] = useState();
    const [loading, setLoading] = useState(true);
    const [upcomingCount, setUpcomingCount] = useState();
    const [pastCount, setPastCount] = useState();

    useEffect(() => {
        const userdata = async () => {
            try {
                const userresponse = await axios.get('/api/user/profile/getUserData');
                const regresponse = await axios.get('/api/user/profile/getRegistrationData');
                console.log("response: ", userresponse);
                setUsername(userresponse.data.username);
                console.log("response: ", regresponse);
                setLoading(false);
                const eventsresponse = await axios.get('/api/event/viewEvents');
                const currentDate = new Date();
                const upcoming = eventsresponse.data.filter((event: Event) => new Date(event.eventDate) > currentDate);
                const past = eventsresponse.data.filter((event: Event) => new Date(event.eventDate) <= currentDate)
                const lengthupcoming = upcoming.length;
                const lengthpast = past.length;
                setUpcomingCount(lengthupcoming);
                setPastCount(lengthpast);
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
                            <Link href="/faculty/createEvent" className="w-full hover:border-l-4 hover:border-red-600 hover:text-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Create Event
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/faculty/viewEvent" className="w-full hover:border-l-4 hover:border-yellow-600 hover:text-yellow-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                View Event
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/faculty" className="w-full border-l-4 border-green-600 text-green-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Profile
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex w-3/4 justify-around">
                    <div className="flex w-full justify-around my-6">
                        {loading ? (
                            <div className="text-4xl italic font-semibold">Good to have you back !!!</div>
                        ) : (
                            <div className="flex flex-col text-4xl slide-in font-serif">
                                <div className="flex justify-start flex-col">
                                    <div className="text-blue-500 text-6xl font-bold">Welcome back</div>
                                    <div className="font-semibold">{username}</div>
                                </div>

                                <div className="flex my-8 justify-start font-thin">
                                    <div>SIT has {upcomingCount} upcoming events</div>
                                </div>

                                <div className="flex my-8 justify-start font-thin">
                                    <div>SIT has already conducted {pastCount} events in all</div>
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