"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import TokenNavbar from "@/components/TokenNavbar";

export default function InchargePage() {
    const router = useRouter();

    const logout = async () => {
        try {
            await axios.get('/api/user/sign-out');
            router.push('/sign-in');
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center itmes-center bg-white">
                <div className='w-full h-full m-auto'>
                    <div className="flex justify-around">
                        <div className="flex">
                            <div className='flex justify-center items-center hover:border-b-4 hover:border-red-400 hover:p-2 w-36 md:48 lg:w-64 xl:w-64 p-1 lg:p-2 xl:p-2'>
                                <Link href='/incharge/createEvent'>
                                    <div className='text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl w-full'>
                                        Create Event
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="flex">
                            <div className='flex justify-center items-center w-64 p-2 hover:border-b-4 hover:border-red-400 hover:p-2'>
                                <Link href='/incharge/viewEvent'>
                                    <div className='text-sm sm:text-xl md:ext-2xl lg:text-4xl xl:text-4xl w-full'>
                                        View Events
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                <Button onClick={logout}>
                    Sign out
                </Button>
            </div>
        </>
    )
}