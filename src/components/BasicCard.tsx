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

interface BasicCardProps {
  userRole: "student" | "incharge";
}

export default function BasicCard({userRole}: BasicCardProps) {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('/api/event/viewEvents');
        setEvents(response.data);
      } catch (error) {
        console.log('Error fetching blogs: ', error);
      }
    };
    fetchEvents();
  }, []);

  const handleDelete = async (eventId: number) => {
    try {
      await axios.delete('/api/event/deleteEvents', {
        data: {
          eventId: eventId
        }
      });      
      setEvents(events.filter(event => event.eventId !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleRegister = async (eventId: number) => {
    try {      
      // Perform registration
      await axios.post('/api/event/registerEvent', {
        eventId: eventId
      });
      
      // Redirect to the registered events page
      if(userRole === 'incharge') {
      router.push('/incharge/registeredEvents')
      } else {
        router.push('/student/registeredEvents')
      }
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  return (
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
                  {/* <Typography level="body-sm">
                    {event.eventDate}
                  </Typography> */}
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

              <CardContent orientation="horizontal">
                {userRole === "incharge" && (
                  <Button
                      variant="solid"
                      size="md"
                      color="danger"
                      aria-label="Delete Event"
                      onClick={() => {
                        handleDelete(event.eventId)
                        window.location.reload()}}
                      sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}

                    >
                      Delete
                    </Button>
                )}
                <Button
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="Register Event"
                  sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
                  onClick={() => handleRegister(event.eventId)}

                >
                  Register
                </Button>
              </CardContent>
            </Card >
          )}
        </div>
      </ul>
    </div>
  );
}