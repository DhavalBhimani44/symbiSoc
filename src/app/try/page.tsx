"use client";
import SignInForm from "@/components/form/SignInForm";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Page() {
    return (
        <>
            <div className="h-[40rem] w-full rounded-md bg-neutral-950 relative antialiased">            
                    <div className="text-neutral-500 mx-auto my-2 text-sm text-center relative z-10">
                        <SignInForm/>
                    </div>                
                <BackgroundBeams/>
            </div>
        </>
    );
}