"use client";
import React, {useState, useEffect} from "react";
import axios from "axios";
import Link from 'next/link';

const page = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('/api/user/viewEvents');
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className='w-full h-full m-auto bg-white'>
            <div className="flex justify-around">
                <div className="flex">
                    <div className='flex justify-center items-center w-64 p-2 hover:border-b-4 hover:border-red-400 hover:p-2'>
                        <Link href='/incharge/createEvent'>
                            <div className='text-4xl w-full'>
                                Create Event
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="flex">
                    <div className='flex justify-center items-center border-b-4 border-red-600 w-64 p-2'>
                        <Link href='/incharge/viewEvent'>
                            <div className='text-4xl w-full'>
                                View Events
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div>
                    <h1>Event List</h1>
                    <ul>
                        {events.map((event) => (
                            <li key={event.id}>
                                <p>Event Name: {event.eventName}</p>
                                <p>Event Description: {event.eventDescription}</p>
                                <p>Organising CLub: {event.organisingClub}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default page;