import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import { useState, useEffect } from "react";
import axios from "axios";
import { date } from 'zod';
import { useRouter } from 'next/navigation';

export default function BasicCard() {
    const [events, setEvents] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const registeredEvents = async () => {
            try {
                const response = await axios.get('/api/event/registeredEvents');
                setEvents(response.data);
            } catch (error) {
                console.log('error fetching registered events:', error);
            }
        };
        registeredEvents();
    }, []);

    return (
        <>
            <div className='w-full my-6'>
                <ul>
                    <div className='flex flex-wrap justify-around w-full'>
                        {events.map((event: any) =>
                            <Card key={event} sx={{ width: 320 }} className="mx-2 my-4">
                                <div>
                                    <AspectRatio minHeight="120px" maxHeight="200px">
                                        <Image width={150} height={150} src="/cbc-logo.png" alt='image' loading='lazy' />
                                    </AspectRatio>

                                    <div>                                                      
                                        <Typography level="title-lg">
                                            {event.eventName}
                                        </Typography>
                                        <li key={event}>
                                            <div>
                                                Event Name: {event.eventName}
                                            </div>
                                            <div>
                                                Event Description: {event.eventDescription}
                                            </div>
                                            <div>
                                                Organnising Club: {event.organisingClub}
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </Card >
                        )}
                    </div>
                </ul>
            </div>
        </>
    );
}