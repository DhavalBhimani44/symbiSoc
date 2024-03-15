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
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";
import { eventSchema } from "@/app/validationSchema";

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
        },
    });

    const onSubmit = async (values: z.infer<typeof eventSchema>) => {
        try {
            await axios.post('/api/user/createEvent', values);
            toast({
                duration: 2000,
                description: 'Event created successfully',
            })
            router.push('/incharge/viewEvent');
        } catch (error: any) {
            toast({
                duration: 2000,
                description: 'Event creation failed!'
            })
            console.log("Following error occured: ", error);
        }
        console.log(values);
    };

    return (
        <div className='w-fit lg:w-1/4 xl:w-1/4 m-auto px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-2 flex flex-col justify-center items-center shadow-2xl bg-gradient-to-l from-red-300 to-red-200'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full flex flex-col justify-center items-center py-1'>
                    <div className="flex flex-col w-full h-3/4 space-y-6 justify-center items-center">
                        <div className='flex w-full sm:w-3/4 md:w-3/4 lg:w-3/4 xl:w-3/4 justify-center items-center'>
                            <FormField
                                control={form.control}
                                name='eventName'
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel><div className="lg:text-xl sm:text-lg">Event Name</div></FormLabel>
                                        <FormControl>
                                            <Input placeholder="Event Name" {...field} />
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
                                            <Input placeholder="Event Description" {...field} />
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
                                            <Input placeholder="Club" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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