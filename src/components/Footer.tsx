import MaxWidthWrapper from "./MaxWidthWrapper"

const Footer = () => {
    return (
        <footer className="flex h-14 inset-x-0 w-full border-b border-gray-200 bg-white/75 backdrop-blur-lg transition-all">
            <MaxWidthWrapper>
                <div className="flex flex-col">
                    <div className="font-semibold text-center redshade mt-5 text-red-600">Designed by: Dhaval Bhimani and Dhruv Patel</div>
                </div>
            </MaxWidthWrapper>
        </footer>
    )
}

export default Footer