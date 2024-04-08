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
            <div className="flex w-full h-screen">
                <div className="flex flex-col w-1/4 z-10 top-14 sticky text-gray-300 bg-neutral-900">
                    <div className="top-14 z-10 fixed w-1/4">
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/admin/roleManagement" className="w-full hover:border-l-4 hover:border-red-600 hover:text-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Role Management
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/admin/createEvent" className="w-full hover:border-l-4 hover:border-yellow-600 hover:text-yellow-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Create Event
                            </Link>
                        </div>
                        <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                            <Link href="/admin/viewEvent" className="w-full hover:border-l-4 hover:border-blue-600 hover:text-blue-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                View Events
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex w-3/4 justify-around">
                    Admin Portal

                    <Button onClick={logout}>
                        Sign out
                    </Button>
                </div>
            </div>
        </>
    )
}