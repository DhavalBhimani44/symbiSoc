"use client";
import SignInForm from "@/components/form/SignInForm";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Page() {
    return (
        <>
            <div className='w-full bg-fixed h-full lg:w-full xl:w-full px-4 sm:px-2 md:px-4 lg:px-4 xl:px-4 py-2 antialiased text-gray-200 bg-black'>
                <SignInForm />
                <SignInForm />
                <SignInForm />
            </div>
        </>
    );
}