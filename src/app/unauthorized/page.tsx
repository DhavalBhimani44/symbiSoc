"use client"
import { useRouter } from "next/navigation";

const NotFoundTitle = () => {
    const router = useRouter();
    const toHomepage = () => {
        router.push("/");
    }
    return (
      <div className="py-20 text-center">
        <div className="font-bold text-gray-600 text-5xl sm:text-4xl">401</div>
        <h1 className="font-bold text-5xl sm:text-4xl">
          You have found a secret place.
        </h1>
        <p className="text-lg sm:text-base text-gray-400 max-w-2xl mx-auto mt-8 mb-12">
          We&apos;re sorry, but you don&apos;t have permission to access this resource. The requested action requires authentication or your credentials are not sufficient for accessing this content.
  
          If you believe you should have access to this resource, please verify that you are logged in with the correct account and that your credentials are up to date.
  
          If you continue to experience issues accessing this content and believe this is in error, please contact your administrator for further assistance.
  
          Thank you for your understanding.
        </p>
        <div className="flex justify-center">
          <button onClick={toHomepage} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
            Take me back to home page
          </button>
        </div>
      </div>
    );
  }
  
  export default NotFoundTitle;
  