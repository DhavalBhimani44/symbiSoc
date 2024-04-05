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
            <div className="flex w-full h-screen">
                <div className="flex flex-col w-1/4 z-10 top-14 sticky text-slate-300 bg-neutral-900">
                    <div className="top-14 z-10 fixed w-1/4">
                        <div className="flex w-full">
                            <Link href="/student/viewEvent" className="w-full hover:border-r-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                View Events
                            </Link>
                        </div>
                        <div className="flex w-full">
                            <Link href="/student/registeredEvents" className="w-full hover:border-r-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                                Registered Events
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex w-3/4 justify-around">
                    Student Portal
                    <Button onClick={logout}>
                        Sign out
                    </Button>
                </div>
            </div>
        </>
    )
}