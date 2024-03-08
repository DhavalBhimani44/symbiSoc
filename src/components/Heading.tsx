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
    <div className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}
