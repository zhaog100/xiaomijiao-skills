"use client";

import { Typewriter } from "react-simple-typewriter";

export default function HeroTypewriter( { words }: { words: string[] } ) {

  return (
    <Typewriter
      words={words}
      loop={0}
      typeSpeed={100}
      delaySpeed={5000}
      deleteSpeed={50}
    />
  );
}
