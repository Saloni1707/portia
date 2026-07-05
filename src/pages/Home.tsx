import { motion } from "framer-motion";
import Hero from "@/components/sections/Hero";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Publications from "@/components/sections/Publications";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground overflow-x-hidden relative">
      {/* Structural Vertical Grid Lines */}
      <div className="fixed inset-0 pointer-events-none z-0 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-0 border-x border-border opacity-50">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="hidden lg:block border-r border-border h-full" />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`md-${i}`} className="hidden md:block lg:hidden border-r border-border h-full" />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto border-x border-border">
        {/* Navigation / Header */}
        <header className="border-b border-border flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 md:p-6 lg:p-8 bg-background">
          <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4 sm:mb-0">
            [ ISSUE NO. 1 — VOL. 2026 ]
          </div>
          <nav className="flex gap-4 md:gap-8 font-mono text-xs uppercase tracking-widest">
            <a href="#about" className="hover:text-muted-foreground transition-colors">About</a>
            <a href="#experience" className="hover:text-muted-foreground transition-colors">Experience</a>
            <a href="#projects" className="hover:text-muted-foreground transition-colors">Projects</a>
            <a href="#publications" className="hover:text-muted-foreground transition-colors">Research</a>
            <a href="#contact" className="hover:text-muted-foreground transition-colors">Contact</a>
          </nav>
        </header>

        <Hero />
        <Experience />
        <Projects />
        <Publications />
        <Skills />
        <Contact />
      </div>
    </main>
  );
}
