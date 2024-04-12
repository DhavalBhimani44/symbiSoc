"use client";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { eventSchema } from "@/app/validationSchema";
import moment from "moment";
import React, { useState, useEffect } from 'react';

type CreateEventForm = z.infer<typeof eventSchema>;

const CreateEventForm = () => {
    const { toast } = useToast();
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    const defaultEventDate = moment(new Date()).format('DD/MM/YYYY');
    const defaultEventTime = moment(new Date()).format('HH:mm');
    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            eventName: '',
            eventDescription: '',
            organisingClub: '',
            eventDate: defaultEventDate,
            eventTime: defaultEventTime,
            eventVenue: '',
            eventPlatform: '',
            speakerName: '',
            speakerDescription: '',
            speakerDesignation: '',
            eventType1: 'OFFLINE',
            eventType2: 'EVERYONE',
        },
    });

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const onSubmit = async (values: z.infer<typeof eventSchema>) => {
        try {
            const eventDate = new Date(values.eventDate);
            const formattedEventDate = eventDate.toISOString()

            const eventTime = moment(values.eventTime, 'HH:mm').toISOString()

            const formattedValues = {
                ...values,
                eventDate: formattedEventDate,
                eventTime: eventTime,
            };

            await axios.post('/api/event/createEvent', formattedValues);
            toast({
                duration: 2000,
                description: 'Event created successfully',
            });
            router.push('/incharge/viewEvent');
        } catch (error: any) {
            toast({
                duration: 2000,
                description: 'Event creation failed!'
            });
            console.log("Following error occurred: ", error);
        }
        console.log(values);
    };

    return (
        <div className={`w-full lg:w-full xl:w-full px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-2 shadow-2xl text-gray-200`} style={{ backgroundImage: 'url("/bg4.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100', width: '100' }}>
            <div className={`font-mono flex flex-col justify-center items-center ${isVisible ? 'slide-in' : ''}`}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center py-1'>
                        <div className="flex flex-col w-full min-h-full space-y-2 justify-center items-center">
                            <div className="flex flex-wrap w-full p-2 justify-around">
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='eventName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Event Name*</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Event Name" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-black" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='eventDescription'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Event Description*</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Event Description" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-black" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='organisingClub'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className='lg:text-xl sm:text-lg'>Organising CLub*</div></FormLabel>
                                                <FormControl>
                                                    <Select {...field} onValueChange={(selectedValue) => form.setValue('organisingClub', selectedValue)}>
                                                        <SelectTrigger className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-black">
                                                            <SelectValue placeholder="Club Name" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="SELECT">Select</SelectItem>
                                                            <SelectItem value="CODEX">Codex</SelectItem>
                                                            <SelectItem value="GDSC">GDSC</SelectItem>
                                                            <SelectItem value="CBC">Cyber Blockchain Club</SelectItem>
                                                            <SelectItem value="ARVR">AR/VR</SelectItem>
                                                            <SelectItem value="AI">AI</SelectItem>
                                                            <SelectItem value="MOSAIC">Mosaic</SelectItem>
                                                            <SelectItem value="WWR">Wrench Welders Racing</SelectItem>
                                                            <SelectItem value="TPC">The Photography Club</SelectItem>
                                                            <SelectItem value="SPACEASTRONOMY">Space Astronomy Club</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full p-2 justify-around">
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='eventDate'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Event Date*</div></FormLabel>
                                                <FormControl>
                                                    <Input type="date" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-black" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='eventTime'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Event Time*</div></FormLabel>
                                                <FormControl>
                                                    <Input type="time" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-black" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='eventVenue'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Event Venue*</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Event Venue" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-black" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='eventPlatform'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Event Platform*</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Platform" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-black" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center">
                                    <FormField
                                        control={form.control}
                                        name='eventType1'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className='lg:text-xl sm:text-lg'>Event Conduction Mode</div></FormLabel>
                                                <FormControl>
                                                    <Select {...field} onValueChange={(selectedValue) => form.setValue('eventType1', selectedValue)}>
                                                        <SelectTrigger className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-black">
                                                            <SelectValue placeholder="User type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="ONLINE">Online</SelectItem>
                                                            <SelectItem value="OFFLINE">Offline</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center">
                                    <FormField
                                        control={form.control}
                                        name='eventType2'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className='lg:text-xl sm:text-lg'>Open to</div></FormLabel>
                                                <FormControl>
                                                    <Select {...field} onValueChange={(selectedValue) => form.setValue('eventType2', selectedValue)}>
                                                        <SelectTrigger className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-black">
                                                            <SelectValue placeholder="User type" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="EVERYONE">All</SelectItem>
                                                            <SelectItem value="CLUBMEMBERS">Club Members</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-full p-2 justify-around">
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='speakerName'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Speaker Name*</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Speaker Name" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-black" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='speakerDesignation'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Speaker Designation*</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Speaker Designation" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-black" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className='flex w-fit sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/3 mt-2 justify-center items-center'>
                                    <FormField
                                        control={form.control}
                                        name='speakerDescription'
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel><div className="lg:text-xl sm:text-lg">Speaker Details</div></FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Speaker Details" className="w-48 md:w-52 lg:w-56 xl:w-60 shadow-lg text-black" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col w-full justify-center items-center mt-4'>
                            <Button className='w-max h-fit hover:shadow active:translate-y-[2px] hover:-translate-y-[1px] text-md shadow-inner' type='submit'>
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default CreateEventForm;