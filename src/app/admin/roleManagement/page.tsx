"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import UsersTab from "@/components/UsersTab";
import { useEffect, useState } from "react";

export default function InchargePage() {
    const router = useRouter();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    })

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
            <div className="flex w-full h-full">
                <div className="flex flex-col w-1/4 h-screen z-10 top-14 sticky text-slate-300 bg-neutral-900">
                <div className="top-14 z-10 fixed w-1/4">
                        <div className="flex w-full">
                            <Link href="/admin/roleManagement" className="w-full border-r-4 border-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Role Management
                            </Link>
                        </div>
                        <div className="flex w-full">
                            <Link href="/admin/createEvent" className="w-full hover:border-r-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Create Event
                            </Link>
                        </div>
                        <div className="flex w-full">
                            <Link href="/admin/viewEvent" className="w-full hover:border-r-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                View Events
                            </Link>
                        </div>
                    </div>
                </div>

                <div className='w-3/4 bg-fixed px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-2 shadow-2xl text-gray-200 relative antialiased' style={{ backgroundImage: 'url("/bg4.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100', width: '100' }}>
                    <div className="flex flex-col w-full">                        
                        <div className="flex flex-col w-full">
                            <div className={`flex w-full my-2 ${isVisible ? 'slide-in' : ''}`}>
                                <UsersTab />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}