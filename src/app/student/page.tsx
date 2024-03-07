"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function StudentPage() {
    const router = useRouter();
    const logout = async() => {
        try {
            await axios.get('/api/user/sign-out');
            router.push('/sign-in');
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <Button onClick={logout}>
                Sign Out
            </Button>
        </div>
    )
}