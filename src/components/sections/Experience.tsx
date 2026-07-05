import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const experiences = [
  {
    company: "Alchemyst AI",
    role: "Forward Deployed Engineer",
    period: "Jan 2026 – March 2026",
    location: "Bangalore, Remote",
    bullets: [
      "Developed and published an in-house LangChain-based Python package, handling prompt orchestration, memory integration, and execution pipelines.",
      "Implemented a context management layer using Alchemyst Memory to persist user state across SDK interactions and improve API ergonomics.",
      "Built a guided onboarding tour in the frontend to improve first-time user experience and product adoption.",
    ],
  },
  {
    company: "GirlScript (GSSOC)",
    role: "Open Source Developer",
    period: "May – July 2024",
    location: "India, Remote",
    bullets: [
      "Contributed to Drawn2Shoe, a React/Node.js open-source e-commerce platform that lets users customize and buy shoes.",
      "Implemented a Wishlist feature using a locally hosted XAMPP server for backend testing and integration.",
      "Improved overall user experience by enhancing UI interactions and user flows.",
      "Collaborated with mentors and contributors through code reviews and discussions.",
    ],
  },
];

export default function Experience() {
  const [active, setActive] = useState(0);

  return (
    <section id="experience" className="border-b border-border bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Section label */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground sticky top-8">
            [ 02 — Experience ]
          </h2>
        </div>

        {/* Tabbed content */}
        <div className="lg:col-span-8 flex flex-col md:flex-row">
          {/* Company tab list */}
          <div className="flex flex-row md:flex-col border-b md:border-b-0 md:border-r border-border min-w-[160px]">
            {experiences.map((exp, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                data-testid={`tab-experience-${i}`}
                className={`relative text-left px-5 py-4 font-mono text-xs uppercase tracking-widest transition-colors duration-150 border-b border-border last:border-b-0
                  ${active === i
                    ? "text-foreground bg-foreground/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-foreground/[0.03]"
                  }`}
              >
                {/* Active indicator bar */}
                {active === i && (
                  <motion.span
                    layoutId="tab-indicator"
                    className="absolute left-0 top-0 bottom-0 w-[2px] bg-foreground"
                  />
                )}
                {exp.company}
              </button>
            ))}
          </div>

          {/* Detail panel */}
          <div className="flex-1 p-6 md:p-8 lg:p-10 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-serif text-2xl md:text-3xl mb-1 leading-snug">
                  {experiences[active].role}{" "}
                  <span className="text-muted-foreground font-sans text-base">
                    @ {experiences[active].company}
                  </span>
                </p>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 110 14"
                  style={{ width: "14rem", height: "0.75rem", marginBottom: "0.25rem", overflow: "visible" }}
                  preserveAspectRatio="none"
                >
                  <motion.path
                    d="M2,9 C12,4 26,13 44,8 C58,4 72,12 90,7 C96,5 102,8 108,7"
                    stroke="#3b82f6"
                    strokeWidth="3.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                  />
                  <motion.path
                    d="M4,11 C18,9 35,12 60,10 C80,9 95,11 107,10"
                    stroke="#3b82f6"
                    strokeWidth="1"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.35"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
                  />
                </svg>
                <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-6">
                  {experiences[active].period} · {experiences[active].location}
                </p>

                <ul className="flex flex-col gap-3">
                  {experiences[active].bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 font-sans text-sm md:text-base leading-relaxed">
                      <span className="mt-[6px] shrink-0 w-[5px] h-[5px] rounded-full bg-foreground/40" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
