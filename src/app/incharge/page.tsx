"use client";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function InchargePage() {
    const router = useRouter();

    const logout = async() => {
        try {
            await axios.get('/api/user/sign-out');
            router.push('/sign-in');
        } catch (error: any) {
            console.log(error.message);
        }
    }

    return(
        <div className="flex flex-col justify-center itmes-center">
            <Button onClick={logout}>
                Sign out
            </Button>
        </div>
    )
}