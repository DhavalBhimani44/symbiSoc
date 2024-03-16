"use client";
import TokenNavbar from '@/components/TokenNavbar';
import CreateEventForm from '@/components/form/CreateEventForm';
import Link from 'next/link';

const page = () => {
    return (
        <>
            <div className='w-full h-full m-auto bg-white'>
                <div className="flex justify-around">
                    <div className="flex">
                        <div className='flex justify-center items-center border-b-4 border-red-600 w-36 md:w-48 lg:w-64 xl:w-64 p-1 lg:p-2 xl:p-2'>
                            <Link href='/incharge/createEvent'>
                                <div className='text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl w-full'>
                                    Create Event                                    
                                </div>
                            </Link>
                        </div>
                    </div>

                    <div className="flex">
                        <div className='flex justify-center items-center p-1 lg:p-2 xl:p-2 hover:border-b-4 hover:border-red-400 hover:p-2 w-36 md:w-48 lg:w-64 xl:w-64'>
                            <Link href='/incharge/viewEvent'>
                                <div className='text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl w-full'>
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
        </>
    );
};

export default page;