import CreateEventForm from "@/components/form/CreateEventForm";
import Link from "next/link";

const page = () => {
    return (
        <div className="flex w-full h-screen">
            <div className="flex flex-col w-1/4 z-10 top-14 sticky text-gray-300 bg-neutral-900">
                <div className="top-14 z-10 fixed w-1/4">
                    <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                        <Link href="/admin/roleManagement" className="w-full hover:border-l-4 hover:border-red-600 hover:text-red-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Role Management
                        </Link>
                    </div>
                    <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                        <Link href="/admin/createEvent" className="w-full border-l-4 border-yellow-600 text-yellow-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Create Event
                        </Link>
                    </div>
                    <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                        <Link href="/admin/viewEvent" className="w-full hover:border-l-4 hover:border-blue-600 hover:text-blue-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            View Events
                        </Link>
                    </div>
                    <div className="flex w-full transition-transform duration-300 transform hover:translate-x-2">
                        <Link href="/admin" className="w-full hover:border-l-4 hover:border-green-600 hover:text-green-600 hover:p-2 flex justify-around text-sm sm:text-xl md:text-2xl lg:text-4xl xl:text-4xl p-1 lg:p-2 xl:p-2">
                            Profile
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