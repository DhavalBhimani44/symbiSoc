"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
        <div className="flex flex-col justify-center itmes-center bg-white">
            <div className='w-full h-full m-auto'>
            <div className="flex justify-around">
                <div className="flex">
                    <div className='flex justify-center items-center hover:border-b-4 hover:border-red-400 hover:p-2 w-64 p-2'>
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
        </div>

            <Button onClick={logout}>
                Sign out
            </Button>
        </div>
    )
}