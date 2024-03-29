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

export default function BasicCard() {
  const [events, setEvents] = useState([]);

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

  const handleDelete = async (eventId: any) => {
    try {
      await axios.delete('/api/event/deleteEvents', {
        data: {
          eventId: eventId
        }
      });
      // Update the events state after successful deletion
      setEvents(events.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className='w-full'>
      <ul>
        <div className='flex flex-wrap justify-around w-full'>
          {events.map((event) =>
            <Card sx={{ width: 320 }} className="mx-2 my-4">
              <div>
                <AspectRatio minHeight="120px" maxHeight="200px">
                  <Image width={150} height={150} src="/cbc-logo.png" alt='image' loading='lazy' />
                </AspectRatio>

                <div>
                  <Typography level="body-sm">
                    12 March, 2024
                  </Typography>
                  <Typography level="title-lg">
                    Yosemite National Park
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
              <Button
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  onClick={() => {
                    handleDelete(event.eventId)
                    window.location.reload()}}
                  sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}

                >
                  Delete
                </Button>
                <Button
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="Explore Bahamas Islands"
                  sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}

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