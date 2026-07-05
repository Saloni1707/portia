import { motion } from "framer-motion";

const publications = [
  {
    title: "Deepfake Detection Techniques: A Systematic Review",
    venue: "ResearchGate",
    description: "A comprehensive systematic review of state-of-the-art deepfake detection techniques, analyzing approaches across deep learning, facial analysis, and forensic methods.",
    link: "https://www.researchgate.net/publication/404383650_Deepfake_Detection_Techniques_A_Systematic_Review",
  },
];

export default function Publications() {
  return (
    <section id="publications" className="border-b border-border bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground sticky top-8">
            [ 04 — Research ]
          </h2>
        </div>

        <div className="lg:col-span-8 flex flex-col">
          {publications.map((paper, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6 }}
              className={`p-6 md:p-8 lg:p-12 ${index !== publications.length - 1 ? "border-b border-border" : ""}`}
              data-testid={`publication-card-${index}`}
            >
              <div className="font-mono text-xs uppercase tracking-widest text-muted-foreground mb-4">
                {paper.venue}
              </div>
              <h3 className="font-serif text-2xl md:text-3xl mb-2 leading-snug">
                {paper.title}
              </h3>
              <svg
                aria-hidden="true"
                viewBox="0 0 110 14"
                style={{ width: "14rem", height: "0.75rem", marginBottom: "1rem", overflow: "visible" }}
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
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
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
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
                />
              </svg>
              <p className="font-sans text-sm md:text-base leading-relaxed mb-8 max-w-prose">
                {paper.description}
              </p>
              <div className="pt-4 border-t border-border">
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-widest hover:opacity-60 transition-opacity underline underline-offset-4"
                  data-testid={`link-publication-${index}`}
                >
                  Read Paper &rarr;
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
