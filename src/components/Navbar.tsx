"use client";
import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Button, buttonVariants } from "./ui/button";
import { useAuth } from "@/context/authContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
    const { user, logout } = useAuth();
    const router = useRouter();

    const onSignIn = () => {
        router.push('/sign-in');
    };

    const onSignUp = () => {
        router.push('/sign-up');
    };

    const handleLogout = () => {
        logout();
        router.push('/sign-out');
    };

    return (
        <nav className="sticky h-14 inset-x-0 top-0 z-30 w-full bg-black text-slate-300 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="h-14 flex items-center justify-between">
                    <Link href="/" className="flex z-40 font-semibold">
                        <span>symbiSoc.</span>
                    </Link>

                    <div className="flex items-center space-x-4">
                        {user ? (
                            // Display logout button if user is logged in
                            <Button variant={"outline"} className="w-fit" onClick={handleLogout}>Logout</Button>
                        ) : (
                            // Display sign in and sign up buttons if user is not logged in
                            <>
                                <Button variant={"secondary"} className="w-fit" onClick={onSignIn}>Sign in</Button>
                                <Button variant={"outline"} className="w-fit" onClick={onSignUp}>Create an account</Button>
                            </>
                        )}
                    </div>
                </div>
            </MaxWidthWrapper>
        </nav>
    );
};

export default Navbar;
