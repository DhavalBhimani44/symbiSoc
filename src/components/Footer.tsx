import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
    return (
        <footer className="flex-shrink-0 w-full border-t border-gray-200 bg-white/75 backdrop-blur-lg">
            <MaxWidthWrapper>
                <div className="flex justify-center items-center h-14">
                    <div className="font-semibold text-center text-red-500">Designed by: Dhaval Bhimani and Dhruv Patel</div>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
};

export default Footer;