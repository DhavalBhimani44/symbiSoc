"use client"
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from "next/navigation";

const Page = () => {
    const [events, setEvents] = useState([]);
    const router = useRouter();

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

    const handleRegister = async (eventId: number) => {
        try {
            const uid = await axios.get('/api/user/idfetch');
            const username = await axios.get('/api/user/idfetch');

            // Validate userId

            if (!uid || !username) {
                console.error('User ID or username is not provided.');
                return;
            }

            await axios.post('/api/user/eventregistration', { uid, username, eventId });
            router.push('/student/registeredEvents');
        } catch (error) {
            console.error('Error registering event:', error);
        }
    };

    return (
        <>
            <div className='flex flex-col'>
                {events.map((event) => (
                    <li key={event.id}>
                        {/* Event details */}
                        <div>Event Name: {event.eventName}</div>
                        <div>Event Description: {event.eventDescription}</div>
                        <div>Organising Club: {event.organisingClub}</div>
                        {/* Register button */}
                        <div><button className="font-bold hover:underline" onClick={() => handleRegister(event.id)}>Register</button></div>
                    </li>
                ))}
            </div>
        </>
    );
};

export default Page;
