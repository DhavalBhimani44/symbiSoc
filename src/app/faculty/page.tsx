"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function FacultyPage() {
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
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-around w-full">
                    <div className="flex w-1/2 bg-red-100">
                        <Link href="/faculty/createEvent" className="w-full hover:border-b-4 hover:border-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Create Event
                        </Link>
                    </div>
                    <div className="flex w-1/2 bg-blue-100">
                        <Link href="/faculty/viewEvent" className="w-full hover:border-b-4 hover:border-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            View Event
                        </Link>
                    </div>
                </div>
                <div className="flex w-full justify-around">
                    Faculty Portal
                </div>
                <div className="flex">
                <Button onClick={logout}>
                    Sign out
                </Button>
                </div>
            </div>
        </>
    )
}