"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import TokenNavbar from "@/components/TokenNavbar";

export default function AdminPage() {
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
                Admin Page
            </div>
        </>
    )
}