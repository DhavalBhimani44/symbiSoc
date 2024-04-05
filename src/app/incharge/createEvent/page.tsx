import CreateEventForm from "@/components/form/CreateEventForm";
import Link from "next/link";

const page = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="flex flex-col w-1/4 z-10 top-14 sticky text-slate-300 bg-neutral-900">
                <div className="top-14 z-10 fixed w-1/4">
                    <div className="flex w-full">
                        <Link href="/incharge/createEvent" className="w-full border-r-4 border-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Create Event
                        </Link>
                    </div>
                    <div className="flex w-full">
                        <Link href="/incharge/viewEvent" className="w-full hover:border-r-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            View Events
                        </Link>
                    </div>
                    <div className="flex w-full">
                        <Link href="/incharge/registeredEvents" className="w-full hover:border-r-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Registered Events
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex w-3/4">
                <CreateEventForm />
            </div>
        </div>
    )
}

export default page;