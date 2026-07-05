import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Contact() {
  const headingRef = useRef<HTMLDivElement>(null);
  const inView = useInView(headingRef, { once: true, margin: "-80px" });

  const perimeter = 2 * Math.PI * 55;

  return (
    <section id="contact" className="bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[50vh]">
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            [ 05 — Contact ]
          </h2>
        </div>

        <div className="lg:col-span-8 p-6 md:p-8 lg:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div ref={headingRef} className="relative inline-block mb-8">
              <h3 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-tight uppercase">
                Let's<br />Connect.
              </h3>

              {/* Animated hand-drawn circle SVG around "Let's" */}
              <svg
                className="absolute pointer-events-none"
                style={{
                  top: "-14%",
                  left: "-8%",
                  width: "62%",
                  height: "72%",
                  overflow: "visible",
                }}
                viewBox="0 0 120 70"
                fill="none"
              >
                <motion.ellipse
                  cx="60"
                  cy="35"
                  rx="54"
                  ry="30"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  style={{
                    rotate: "-4deg",
                    pathLength: inView ? 1 : 0,
                  }}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.2, ease: "easeInOut", delay: 0.3 }}
                />
                {/* Second slightly offset stroke for hand-drawn feel */}
                <motion.ellipse
                  cx="61"
                  cy="36"
                  rx="52"
                  ry="28"
                  stroke="#3B82F6"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeOpacity="0.35"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={inView ? { pathLength: 1, opacity: 1 } : {}}
                  transition={{ duration: 1.4, ease: "easeInOut", delay: 0.5 }}
                />
              </svg>
            </div>

            <div className="mt-4 border-t border-border pt-8 font-mono text-xs uppercase tracking-widest">
              <span className="text-muted-foreground block mb-1">Email</span>
              <a href="mailto:saloni.talks.tech@gmail.com" className="hover:underline underline-offset-4 decoration-border normal-case" data-testid="link-email">
                saloni.talks.tech@gmail.com
              </a>
            </div>

          </motion.div>
        </div>
      </div>
      <div className="border-t border-border p-4 text-center font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        Built and designed by Saloni.<br />
        © {new Date().getFullYear()} All rights reserved.
      </div>
    </section>
  );
}
