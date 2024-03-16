"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import TokenNavbar from "@/components/TokenNavbar";

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
            <div className="flex flex-col justify-center items-center">
                Student Page
            </div>
        </>
    )
}