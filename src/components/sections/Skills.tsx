import { motion } from "framer-motion";

export default function Skills() {
  const skills = [
    {
      category: "Languages",
      items: ["Python", "JavaScript", "TypeScript", "HTML", "Go"]
    },
    {
      category: "Frameworks",
      items: ["React.js", "Next.js", "Node.js", "Express.js"]
    },
    {
      category: "Tools & Systems",
      items: ["Git", "GitHub", "VS Code", "Linux", "Redis"]
    }
  ];

  return (
    <section className="border-b border-border bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            [ 04 — Technical Arsenal ]
          </h2>
        </div>

        <div className="lg:col-span-8 p-6 md:p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
            {skills.map((skillGroup, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="font-mono text-xs uppercase tracking-widest border-b border-border pb-4 mb-4">
                  {skillGroup.category}
                </h3>
                <ul className="flex flex-col gap-2">
                  {skillGroup.items.map((item, i) => (
                    <li key={i} className="font-sans text-lg tracking-tight">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
