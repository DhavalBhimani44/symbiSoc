"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from "next/navigation";

interface PageProps {
    userId: string; // Assuming userId is of type string
}

const Page = ({ userId }: PageProps) => {
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
            await axios.post('/api/user/eventregistration', { userId, eventId });
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
                        <div><button onClick={() => handleRegister(event.id)}>Register</button></div>
                    </li>
                ))}
            </div>
        </>
    );
};

export default Page;
