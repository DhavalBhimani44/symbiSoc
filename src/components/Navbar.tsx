"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const router = useRouter();
    const onSignUp = () => {
        router.push('/sign-up');
      }
    
      const onSignIn = () => {
        router.push('/sign-in');
      }
    return(
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="h-14 flex items-center justify-between border-b border-zinc-200">
                    <Link 
                        href='/' 
                        className="flex z-40 font-semibold">
                        <span>symbiSoc.</span>
                    </Link>

                    <div className="items-center space-x-4">
                        <>
                        <Button className="w-fit" onClick={onSignUp}>Create Account</Button>
                        <Button className="w-fit" onClick={onSignIn}>Sign up</Button>
                        </>
                    </div>
                </div>
             </MaxWidthWrapper>
        </nav>
    )
}

export default Navbar;