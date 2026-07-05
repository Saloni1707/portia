import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import PixelPortrait from "@/components/PixelPortrait";

const FULL_TEXT = "hi, Saloni here.";
const TYPING_SPEED = 70;

function useTypewriter(text: string, speed: number) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    setDone(false);
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return { displayed, done };
}

export default function Hero() {
  const { displayed, done } = useTypewriter(FULL_TEXT, TYPING_SPEED);

  return (
    <section className="min-h-[85vh] grid grid-cols-1 lg:grid-cols-12 border-b border-border bg-background">
      {/* Pixel portrait — left column */}
      <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-border flex flex-col">
        <div className="flex-grow overflow-hidden relative" style={{ minHeight: "380px" }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="w-full h-full absolute inset-0"
          >
            <PixelPortrait src="/saloni.jpeg" pixelSize={6} className="w-full h-full" />
          </motion.div>
        </div>
        <div className="p-6 md:p-8 border-t border-border font-mono text-xs uppercase tracking-widest leading-relaxed flex flex-col gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="text-muted-foreground block mb-1">Location</span>
            <span className="text-foreground">India</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="text-muted-foreground block mb-1">Availability</span>
            <span className="text-foreground">Open to roles</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="pt-4 border-t border-border flex gap-4"
          >
            <a href="https://github.com/Saloni1707" target="_blank" rel="noreferrer" className="hover:text-muted-foreground transition-colors underline underline-offset-4 decoration-border" data-testid="link-github-hero">GitHub</a>
            <a href="https://x.com/Saloni_who" target="_blank" rel="noreferrer" className="hover:text-muted-foreground transition-colors underline underline-offset-4 decoration-border" data-testid="link-twitter-hero">Twitter</a>
          </motion.div>
        </div>
      </div>

      {/* Intro text — right columns */}
      <div className="lg:col-span-8 flex flex-col justify-center p-8 md:p-12 lg:p-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground mb-10">
            · Software Engineer
          </p>

          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight mb-8">
            {"hi, "}
            <span className="relative inline-block">
              {displayed.slice(4, 10)}
              <svg
                aria-hidden="true"
                className="absolute left-[-2%] w-[104%] overflow-visible pointer-events-none"
                style={{ bottom: "-0.18em" }}
                viewBox="0 0 110 14"
                preserveAspectRatio="none"
              >
                <path
                  d="M2,9 C12,4 26,13 44,8 C58,4 72,12 90,7 C96,5 102,8 108,7"
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: 130,
                    strokeDashoffset: displayed.length >= 10 ? 0 : 130,
                    transition: "stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1) 0.15s",
                  }}
                />
                <path
                  d="M4,11 C18,9 35,12 60,10 C80,9 95,11 107,10"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.35"
                  style={{
                    strokeDasharray: 120,
                    strokeDashoffset: displayed.length >= 10 ? 0 : 120,
                    transition: "stroke-dashoffset 0.7s cubic-bezier(0.4,0,0.2,1) 0.3s",
                  }}
                />
              </svg>
            </span>
            {displayed.slice(10)}
            <span
              className="inline-block w-[3px] h-[0.85em] bg-foreground align-middle ml-1"
              style={{
                animation: done ? "blink 1s step-end infinite" : "none",
                opacity: done ? undefined : 1,
              }}
            />
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-base md:text-lg leading-relaxed text-foreground/80 max-w-xl mb-12"
          >
            I build AI applications with a focus on memory systems, LLMs, and backend
            engineering. I'm a researcher and a developer. Outside of coding, I love expressing my creativity by blending art and technology.

          </motion.p>

          <div className="flex justify-center">
            <motion.a
              href="mailto:saloni.talks.tech@gmail.com"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="inline-block font-mono text-xs uppercase tracking-widest border border-foreground px-6 py-3 hover:bg-foreground hover:text-background transition-colors duration-200"
              data-testid="link-say-hi"
            >
              Say hi &rarr;
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
