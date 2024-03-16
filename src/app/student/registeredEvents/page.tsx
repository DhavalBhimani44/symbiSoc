"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TokenNavbar from "@/components/TokenNavbar";
import Link from "next/link";

export default function StudentPage() {
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
                    <div className="flex justify-around w-full">
                        <div className="flex w-1/2 bg-red-100">
                            <Link href="/student/viewEvent" className="w-full hover:border-b-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                View Events
                            </Link>
                        </div>
                        <div className="flex w-1/2 bg-blue-100">
                            <Link href="/student/registeredEvents" className="w-full border-b-4 border-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Registered Events
                            </Link>
                        </div>
                    </div>

                    <div className="flex w-full">
                        Registered Events
                    </div>
                </div>

                <Button onClick={logout}>
                    Sign out
                </Button>
            </div>
        </>
    )
}