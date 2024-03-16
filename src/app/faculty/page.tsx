"use client";
import TokenNavbar from "@/components/TokenNavbar";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";

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
                Faculty Page
            </div>
        </>
    )
}