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
import { useRouter } from 'next/navigation';
import { toast } from '@/components/ui/use-toast';

interface BasicCardProps {
  userRole: "student" | "incharge" | "admin" | "faculty";
}

interface Event{
  eventId: number;
}

export default function BasicCard({ userRole }: BasicCardProps) {
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
      toast({
        duration: 2000,
        description: 'Event deleted successfully'
      });
      setEvents(events.filter((event: Event) => event.eventId !== eventId));
    } catch (error) {
      console.error('Error deleting event:', error);
      toast({
        duration: 2000,
        description: 'Error deleting event'
      });
    }
  };

  const handleRegister = async (eventId: number) => {
    try {
      await axios.post('/api/event/registerEvent', {
        eventId: eventId
      });
      if (userRole === 'incharge') {
        router.push('/incharge/registeredEvents');
      } else {
        router.push('/student/registeredEvents');
      }
      toast({
        duration: 2000,
        description: 'Registration successful'
      });
    } catch (error) {
      console.error('Error registering for event:', error);
      toast({
        duration: 2000,
        description: 'Registration failed'
      });
    }
  };

  const eventDetail = async (eventId: number) => {
    if (userRole === 'student') {
      router.push(`/student/viewEvent/${eventId}`);
    } else if (userRole === 'admin') {
      router.push(`/admin/viewEvent/${eventId}`);
    } else if (userRole === 'faculty') {
      router.push(`/faculty/viewEvent/${eventId}`);
    } else if (userRole === 'incharge') {
      router.push(`/incharge/viewEvent/${eventId}`);
    } else {
      router.push('/student');
    }
  };

  return (
    <div className='w-full my-6'>
      <ul>
        <div className='flex flex-wrap justify-around w-full'>
          {events.map((event: any) => (
            <Card
              key={event}
              className="mx-2 my-4 shadow-cyan-600 shadow-md transition-transform transform hover:translate-y-[-5px] hover:scale-105 hover:shadow-md hover:shadow-blue-700"
            >
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
                      Organising Club: {event.organisingClub}
                    </div>
                  </li>
                </div>
              </div>

              <CardContent orientation="horizontal" className="flex justify-between items-center">
                {userRole === "incharge" && (
                  <Button
                    variant="solid"
                    size="md"
                    color="danger"
                    aria-label="Delete Event"
                    onClick={() => {
                      handleDelete(event.eventId)
                      window.location.reload()
                    }}
                    sx={{ fontWeight: 600 }}
                  >
                    Delete
                  </Button>
                )}
                <Button
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="Register Event"
                  onClick={() => handleRegister(event.eventId)}
                  sx={{ fontWeight: 600 }}
                >
                  Register
                </Button>
                <Button
                  variant="solid"
                  size="md"
                  color="primary"
                  aria-label="More Info"
                  onClick={() => eventDetail(event.eventId)}
                  sx={{ fontWeight: 600 }}
                >
                  More Info
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </ul>
    </div>
  );
}
