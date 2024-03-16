"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";
import axios from "axios";

const Navbar = () => {
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
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="h-14 flex items-center justify-between border-b border-zinc-200">
                    <Link
                        href='/'
                        className="flex z-40 font-semibold">
                        <span>symbiSoc.</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        <>
                            <Button variant={"secondary"} className="w-fit" onClick={logout}>Sign Out</Button>                            
                        </>
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar;