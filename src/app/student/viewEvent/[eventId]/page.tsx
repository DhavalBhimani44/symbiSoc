"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";

const Page = ({ params }: any) => {
    const [events, setEvents] = useState([]);
    const eventId = params?.eventId;

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/event/viewEvents');
                const allEvents = response.data;
                const filteredEvents = eventId ? allEvents.filter(event => event.eventId === Number(eventId)) : [];
                setEvents(filteredEvents);
            } catch (error) {
                console.error("Error fetching events:", error);
            }
        };

        fetchEvents();
    }, [eventId]);


    return (
        <>
            <div className="flex w-full h-full">
                <div className="flex flex-col w-1/4 h-screen z-10 top-14 sticky text-gray-300 bg-neutral-900">
                    <div className="top-14 z-10 fixed w-1/4">
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href='/student/viewEvent' className="w-full hover:border-l-4 hover:border-red-500 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2 hover:text-red-500">
                                View Events
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href='/student/registeredEvents' className="w-full hover:border-l-4 hover:border-red-500 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2 hover:text-red-500">
                                Registered Events
                            </Link>
                        </div>
                    </div>
                </div>


                <div className="w-3/4 flex">
                    <ul className="w-full">
                        {events.map(event => (
                            <li key={event.eventId} className="flex flex-col w-full">
                                <div className="flex flex-col w-full pl-4 bg-gray-200 h-screen">
                                    <div className="flex justify-center items-center text-2xl sm:text-2xl md:text-4xl lg:text-6xl xl:text-6xl w-full mt-4">
                                        <div className="flex font-semibold justify-center items-center w-full">{event.eventName} by {event.organisingClub} club</div>
                                    </div>
                                    <div className="flex flex-col text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl mt-4">
                                        <div className="text-2xl sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl font-semibold">Event details: </div>
                                        <div className="flex mt-2">
                                            <div className="font-bold">Organising Club: </div>
                                            <div> {event.organisingClub}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Event name: </div>
                                            <div>{event.eventName}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Event description: </div>
                                            <div>{event.eventDescription}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Date: </div>
                                            <div></div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Time: </div>
                                            <div></div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Venue: </div>
                                            <div>{event.eventVenue}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Platform: </div>
                                            <div>{event.eventPlatform}</div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl mt-4">
                                        <div className="text-2xl sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl font-semibold">Speaker details:</div>
                                        <div className="flex">
                                            <div className="font-bold">Speaker Name: </div>
                                            <div>{event.speakerName}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Speaker Designation: </div>
                                            <div>{event.speakerDesignation}</div>
                                        </div>
                                        <div className="flex">
                                            <div className="font-bold">Speaker Description: </div>
                                            <div>{event.speakerDescription}</div>
                                        </div>
                                    </div>
                                    <div className="flex text-lg sm:text-lg md:text-xl lg:text-2xl xl:text-2xl mt-4 text-red-400 w-full">
                                        <div className="flex justify-center items-center w-full">**Event will be conducted {event.eventType1} and is open to {event.eventType2}**</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Page;
