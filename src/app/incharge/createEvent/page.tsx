import CreateEventForm from "@/components/form/CreateEventForm";
import Link from "next/link";

const page = () => {
    return(
        <div className="flex flex-col justify-center items-center w-full">
                <div className="flex justify-around w-full z-10 top-14 sticky">
                    <div className="flex w-1/3 bg-blue-100">
                        <Link href="/incharge/createEvent" className="w-full border-b-4 border-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Create Event
                        </Link>
                    </div>
                    <div className="flex w-1/3 bg-red-100">
                        <Link href="/incharge/viewEvent" className="w-full hover:border-b-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            View Events
                        </Link>
                    </div>
                    <div className="flex w-1/3 bg-red-100">
                        <Link href="/incharge/registeredEvents" className="w-full hover:border-b-4 hover:border-red-400 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Registered Events
                        </Link>
                    </div>
                </div>
                
                <div className="flex w-full">
                    <CreateEventForm/>
                </div>
            </div>
    )
}

export default page;