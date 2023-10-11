import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Marquee from "react-fast-marquee";

export default function Home() {
  return (
    <>
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-40 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            SymbiSoc is under development!
          </p>
        </div>

        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Register for your <span className="text-red-600">events</span> in seconds.
        </h1>

        <p className="mt-5 max-w-prose text-zinc-700 sm:text-xl">
          With <span className="font font-semibold">symbiSoc</span>, you can streamline your event registration process in SIT, saving your time and eliminating the hassle of traditional registration methods.
        </p>

        <Link className={buttonVariants({
          size: 'lg',
          className: 'mt-5'
        })} href='/dashboard' target="_blank">
          Get Started <ArrowRight className="ml-2 h-5 w-5"/>
        </Link>
      </MaxWidthWrapper>

        {/* value proposition section */}

        <div>
          <div className="relative-isolate">
            <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
              <div style={{
                clipPath:"polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }} 
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#ae5e66] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"/>
            </div>

            <div className="flex flex-col justify-center items-center text-center">
              <div className="mt-24 mb-10 font-bold tracking-wide text-slate-900 lg:text-7xl md:text-3xl sm:text-sm underline-offset-8 decoration-solid decoration-from-font ">
                <p>Club's at <span className="text-red-600">SIT</span></p>
              </div>
              <div className="container mx-auto lg:max-w-4xl h-full md:max-w-xl sm:min-w-min h-32 mx-auto flex flex-col justify-center items-center">
                <div className="lg:max-w-3xl">
                  <Marquee direction="left">
                    <Image src='/ai-club-logo.jpg' width={200} height={100} quality={100} alt='' className="p-3"/>
                    <Image src='/cbc-logo.png' width={200} height={100} quality={100} alt='' className="p-3"/>
                    <Image src='/codex-logo.jpg' width={200} height={100} quality={100} alt='' className="p-3"/>
                    <Image src='/ar-vr-logo.jpg' width={200} height={100} quality={100} alt='' className="p-3"/>
                  </Marquee>
                </div>
                <div className="lg:max-w-2xl">
                  <Marquee direction="right">
                    <Image src='/ar-vr-logo.jpg' width={200} height={100} quality={100} alt='' className="p-3"/>
                    <Image src='/ai-club-logo.jpg' width={200} height={100} quality={100} alt='' className="p-3"/>
                    <Image src='/codex-logo.jpg' width={200} height={100} quality={100} alt='' className="p-3"/>
                    <Image src='/cbc-logo.png' width={200} height={100} quality={100} alt='' className="p-3"/>
                  </Marquee>
                </div>
                <div className="lg:max-w-4xl">
                  <Marquee direction="left">
                    <Image src='/cbc-logo.png' width={220} height={100} quality={100} alt='' className="px-5 py-3"/>
                    <Image src='/ai-club-logo.jpg' width={220} height={100} quality={100} alt='' className="px-5 py-3"/>
                    <Image src='/ar-vr-logo.jpg' width={220} height={100} quality={100} alt='' className="px-5 py-3"/>
                    <Image src='/codex-logo.jpg' width={220} height={100} quality={100} alt='' className="px-5 py-3"/>
                  </Marquee>
                </div>
              </div>
            </div>

            
          </div>
        </div>

        {/* Feature Section */}

        <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
          <div className="mb-12 px-6 lg:px-8 ">
            <div className="mx-auto max-w-2xl sm:text-center">
              <h2 className="mt-2 font-bold text-4xl text-gray-900 sm:text-5xl">Register in minutes!</h2>
              <p className="mt-4 text-lg text-gray-600">Registering have never been easier than with <span className="font-semibold">symbiSoc</span></p>
            </div>
          </div>

          {/*steps*/}
          <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-violet-600">Step 1</span>
                <span className="text-xl font-semibold">Sign up for an account</span>
                <span className="mt-2 text-zinc-700">Sign up using your PRN</span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-violet-600">Step 2</span>
                <span className="text-xl font-semibold">Fill up the form</span>
                <span className="mt-2 text-zinc-700">Click on the ongoing events and fill up the form for the event you want to register for.</span>
              </div>
            </li>
            <li className="md:flex-1">
              <div className="flex flex-col space-y-2 border-l-4 border-zinc-300 py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
                <span className="text-sm font-medium text-violet-600">Step 3</span>
                <span className="text-xl font-semibold">Enjoy your event</span>
                <span className="mt-2 text-zinc-700">It&apos;s that simple!</span>
              </div>
            </li>
          </ol>
        </div>
    </>
  )
}
