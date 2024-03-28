import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
    return (
        <footer className="flex-shrink-0 bottom-0 sticky z-40 w-full bg-black backdrop-blur-lg">
            <MaxWidthWrapper>
                <div className="flex justify-center items-center h-14">
                    <div className="text-center text-blue-500">Designed by: Dhaval Bhimani and Dhruv Patel</div>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
};

export default Footer;