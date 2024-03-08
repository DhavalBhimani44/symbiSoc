"use client";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
export function Heading() {
  const words = [
    {
      text: "Club's",
    },
    {
      text: "at",
    },
    {
      text: "SIT.",
      className: "text-red-600 dark:text-red-600",
    },
  ];
  return (
    <h1 className="mt-6 mb-6 max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
      <TypewriterEffectSmooth words={words} />
    </h1>
  );
}
