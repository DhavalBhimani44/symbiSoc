"use client";
import CreateEventForm from '@/components/form/CreateEventForm';
import Link from 'next/link';

const page = () => {
    return (
        <div className='w-full h-full m-auto bg-white'>
            <div className="flex justify-around">
                <div className="flex">
                    <div className='flex justify-center items-center border-b-4 border-red-600 w-64 p-2'>
                        <Link href='/incharge/createEvent'>
                            <div className='text-4xl'>
                                Create Event
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="flex">
                    <div className='flex justify-center items-center w-64 p-2 hover:border-b-4 hover:border-red-400 hover:p-2'>
                        <Link href='/incharge/viewEvent'>
                            <div className='text-4xl'>
                                View Events
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div>
                <CreateEventForm />
            </div>
        </div>
    );
};

export default page;