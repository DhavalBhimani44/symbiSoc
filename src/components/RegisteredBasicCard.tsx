import * as React from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import Image from 'next/image';
import { useState, useEffect } from "react";
import axios from "axios";
import { date } from 'zod';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';

interface EventProps {
    eventName: string;
    eventDescription: string;
    organisingClub: string;
}


export default function BasicCard() {
    const [events, setEvents] = useState<EventProps[]>([]);
    const router = useRouter();

    useEffect(() => {
        const registeredEvents = async () => {
            try {
                const response = await axios.get('/api/event/registeredEvents');
                console.log("Response from Basic Card is: ", response)
                setEvents(response.data);
            } catch (error) {
                console.log('error fetching registered events:', error);
            }
        };
        registeredEvents();
    }, []);

    // Function to remove duplicates from an array of objects based on a key
    const removeDuplicatesByKey = (array: EventProps[], key: string) => {
        const seen = new Set();
        return array.filter((item) => {
            const value = item[key];
            if (seen.has(value)) {
                return false;
            }
            seen.add(value);
            return true;
        });
    };

    // Remove duplicates from the events array based on eventName
    const uniqueEvents = removeDuplicatesByKey(events, 'eventName');

    return (
        <>
            <div className='w-full my-6'>
                <ul>
                    <div className='flex flex-wrap justify-around w-full'>
                        {uniqueEvents.map((event: EventProps, index: number) =>
                            <Card key={index} sx={{ width: 320 }} className="mx-2 my-4">
                                <div>
                                    <AspectRatio minHeight="120px" maxHeight="200px">
                                        <Image width={150} height={150} src="/cbc-logo.png" alt='image' loading='lazy' />
                                    </AspectRatio>

                                    <div>                                                      
                                        <Typography level="title-lg">
                                            {event.eventName}
                                        </Typography>
                                        <li key={index}>
                                            <div>
                                                Event Name: {event.eventName}
                                            </div>
                                            <div>
                                                Event Description: {event.eventDescription}
                                            </div>
                                            <div>
                                                Organising Club: {event.organisingClub}
                                            </div>
                                        </li>
                                    </div>
                                </div>
                            </Card>
                        )}
                    </div>
                </ul>
            </div>
        </>
    );
}
