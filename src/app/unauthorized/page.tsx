"use client";

import Navbar from "@/components/Navbar";

export default function UnauthorizedPage() {
    return(
        <>
        <div className="min-h-full flex flex-col justify-center items-center m-4 text-red-700">
            <div className="text-3xl lg:text-8xl m-4">
                401
            </div>
            <div className="text-2xl lg:text-6xl font-semibold m-4">
                Unauthorized Access
            </div>
            <div className="text-lg lg:text-3xl m-4">
                Please Sign-In if you are an existing user
            </div>
            <div className="text-lg lg:text-3xl m-4">
                Please Sign-Up if you don't have an account
            </div>
        </div>
        </>
    )
}