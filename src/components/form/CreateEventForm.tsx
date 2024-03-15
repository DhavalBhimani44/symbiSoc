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

type CreateEventForm = z.infer<typeof eventSchema>;

const CreateEventForm = () => {
    const { toast } = useToast();
    const router = useRouter();
    const form = useForm<z.infer<typeof eventSchema>>({
        resolver: zodResolver(eventSchema),
        defaultValues: {
            eventName: '',
            eventDescription: '',
            organisingClub: '',
            eventDate: new Date().toLocaleDateString('en-US'),
            eventTime: new Date().toISOString(),
            eventVenue: '',
            eventPlatform: '',
            sponsors: '',
            speakerName: '',
            speakerDescription: '',
            speakerDesignation: '',
            eventType1: 'OFFLINE',
            eventType2: 'OPENTOALL',
        },
    });

    const onSubmit = async (values: z.infer<typeof eventSchema>) => {
        try {
            const formattedEventDate = moment(values.eventDate, 'Do-MM-YYYY').toISOString();
            const formattedEventTime = moment(values.eventTime, 'HH:mm:ss').toISOString();

            const formattedValues = {
                ...values,
                eventDate: formattedEventDate,
                eventTime: formattedEventTime,
            };

            await axios.post('/api/user/createEvent', formattedValues);
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
        <div className='w-fit lg:w-full xl:w-full m-auto px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-2 flex flex-col justify-center items-center shadow-2xl bg-gradient-to-l from-red-300 to-red-200'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center py-1'>
                    <div className="flex flex-col w-full h-3/4 space-y-6 justify-center items-center">

                        <div className="flex items-center space-x-12">
                            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
                                <FormField
                                    control={form.control}
                                    name='eventName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className="lg:text-xl sm:text-lg">Event Name</div></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Event Name" className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
                                <FormField
                                    control={form.control}
                                    name='eventDescription'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className="lg:text-xl sm:text-lg">Event Description</div></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Event Description" className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
                                <FormField
                                    control={form.control}
                                    name='organisingClub'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className="lg:text-xl sm:text-lg">Organising CLub</div></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Club" className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-12 items-center">
                            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
                                <FormField
                                    control={form.control}
                                    name='eventDate'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className="lg:text-xl sm:text-lg">Event Date</div></FormLabel>
                                            <FormControl>
                                                <Input type="date" className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
                                <FormField
                                    control={form.control}
                                    name='eventTime'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className="lg:text-xl sm:text-lg">Event Time</div></FormLabel>
                                            <FormControl>
                                                <Input type="time" className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
                                <FormField
                                    control={form.control}
                                    name='eventVenue'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className="lg:text-xl sm:text-lg">Event Venue</div></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Platform" className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
                                <FormField
                                    control={form.control}
                                    name='eventPlatform'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className="lg:text-xl sm:text-lg">Event Platform</div></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Platform" className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-12 items-center">
                            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
                                <FormField
                                    control={form.control}
                                    name='sponsors'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className="lg:text-xl sm:text-lg">Sponsors</div></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Sponsors" className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
                                <FormField
                                    control={form.control}
                                    name='speakerName'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className="lg:text-xl sm:text-lg">Speaker Name</div></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Speaker Name" className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
                                <FormField
                                    control={form.control}
                                    name='speakerDesignation'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className="lg:text-xl sm:text-lg">Speaker Desig</div></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Speaker Designation" className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
                                <FormField
                                    control={form.control}
                                    name='speakerDescription'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className="lg:text-xl sm:text-lg">Speaker Details</div></FormLabel>
                                            <FormControl>
                                                <Input placeholder="Speaker Details" className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                        <div className="flex space-x-12 items-center">
                            <div className="flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center">
                                <FormField
                                    control={form.control}
                                    name='eventType1'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className='lg:text-xl sm:text-lg'>Event Type</div></FormLabel>
                                            <FormControl>
                                                <Select {...field} onValueChange={(selectedValue) => form.setValue('eventType1', selectedValue)}>
                                                    <SelectTrigger className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg">
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
                            <div className="flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center">
                                <FormField
                                    control={form.control}
                                    name='eventType2'
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel><div className='lg:text-xl sm:text-lg'>Event Type</div></FormLabel>
                                            <FormControl>
                                                <Select {...field} onValueChange={(selectedValue) => form.setValue('eventType2', selectedValue)}>
                                                    <SelectTrigger className="w-48 sm:w-56 md:w-56 lg:w-56 xl:w-64 shadow-lg">
                                                        <SelectValue placeholder="User type" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="OPENTOALL">Open to all</SelectItem>
                                                        <SelectItem value="CLUBMEMBERS">Club Members</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col w-full justify-center items-center mt-6'>
                        <Button className='w-max h-fit text-md shadow-inner' type='submit'>
                            Sign up
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    )
}

export default CreateEventForm;