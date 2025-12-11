"use client";
import { useState, useEffect } from "react";

const messages = [
  "Explore the most powerful AI tools of 2025.",
  "Find the perfect AI tool for your workflow.",
  "Boost productivity with next-gen AI tools.",
  "Discover AI tools for design, coding, and automation.",
  "Stay ahead with cutting-edge artificial intelligence.",
];

export default function ChangingText() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setIndex((prev) => (prev + 1) % messages.length);
        setFade(true);
      }, 300);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <p
      className={`text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto transition-opacity duration-300 ${
        fade ? "opacity-100" : "opacity-0"
      }`}
    >
      {messages[index]}
    </p>
  );
}