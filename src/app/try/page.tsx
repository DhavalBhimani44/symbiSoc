"use client";
import SignInForm from "@/components/form/SignInForm";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function Page() {
    return (
        <>
            <div className="h-full w-full rounded-md relative antialiased bg-blue-500 bg-fixed" style={{ backgroundImage: 'url("/bg4.jpg")', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundAttachment: 'fixed', height: '100', width: '100' }}>
                <div className="w-full h-full flex flex-col">
                    <div className="flex">
                        <SignInForm />
                    </div>
                    <div className="flex">
                        <SignInForm />
                    </div>
                    <div className="flex">
                        <SignInForm />
                    </div>
                </div>
            </div>
        </>
    );
}