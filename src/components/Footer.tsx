import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
    return (
        <footer className="flex-shrink-0 bottom-0 sticky z-40 h-14 bg-neutral-950">
            <MaxWidthWrapper>
                <div className="flex justify-around items-center h-14">
                    <div className="text-center text-blue-500">
                        Under the guidance of: Dr.Deepali Vora and Mrs.Shubhangi Deokar
                    </div>
                    <div className="text-center text-blue-500">
                        Designed by: Dhaval Bhimani and Dhruv Patel
                    </div>
                </div>
            </MaxWidthWrapper>
        </footer>
    );
};

export default Footer;