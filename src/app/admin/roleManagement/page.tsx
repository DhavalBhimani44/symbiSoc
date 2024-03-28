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
        <>
            <div className="flex flex-col justify-center itmes-center bg-white">
                <div className='w-full h-full m-auto'>
                    <div className="flex justify-around w-full z-10 top-14 sticky">
                        <div className="flex w-1/3 bg-blue-100">
                            <Link href="/admin/roleManagement" className="w-full border-b-4 hover:border-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Role Management
                            </Link>
                        </div>
                        <div className="flex w-1/3 bg-red-100">
                            <Link href="/admin/createEvent" className="w-full hover:border-b-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Create Event
                            </Link>
                        </div>
                        <div className="flex w-1/3 bg-red-100">
                            <Link href="/admin/viewEvent" className="w-full hover:border-b-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Registered Events
                            </Link>
                        </div>
                    </div>

                    <div className="flex w-full justify-around">
                        User Role Management
                    </div>
                </div>                
            </div>
        </>
    )
}