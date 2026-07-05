import { motion } from "framer-motion";

export default function Education() {
  return (
    <section id="about" className="border-b border-border grid grid-cols-1 lg:grid-cols-12 bg-background">
      <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-12">
        <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
          [ 01 — Education ]
        </h2>
      </div>
      
      <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="border-b md:border-b-0 md:border-r border-border p-6 md:p-8 lg:p-12"
        >
          <p className="font-mono text-xs text-muted-foreground mb-4 uppercase tracking-wider">Present</p>
          <h3 className="font-serif text-2xl md:text-3xl mb-2">RMD Sinhagad College of Engineering</h3>
          <p className="font-sans text-sm md:text-base leading-relaxed text-foreground">
            BE Computer Science
          </p>
          <div className="mt-6 flex flex-col gap-2 font-mono text-xs uppercase tracking-wider">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Year</span>
              <span>3rd Year</span>
            </div>
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">CGPA</span>
              <span>9.64</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="p-6 md:p-8 lg:p-12"
        >
          <p className="font-mono text-xs text-muted-foreground mb-4 uppercase tracking-wider">Completed</p>
          <h3 className="font-serif text-2xl md:text-3xl mb-2">Bharati Vidyapeeth English Medium School</h3>
          <p className="font-sans text-sm md:text-base leading-relaxed text-foreground">
            Grade 12
          </p>
          <div className="mt-6 flex flex-col gap-2 font-mono text-xs uppercase tracking-wider">
            <div className="flex justify-between border-b border-border pb-2">
              <span className="text-muted-foreground">Score</span>
              <span>91%</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
