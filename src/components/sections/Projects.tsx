import { motion } from "framer-motion";

const projects = [
  {
    title: "WorkQueue",
    tech: "Node.js · Redis · TypeScript",
    category: "Distributed Systems",
    description: "Redis-based distributed job processing system with retries, scheduling, and dead-letter queues. Modular framework with built-in metrics and observability.",
    link: "https://github.com/Saloni1707/RedisDistro",
  },
  {
    title: "Sketch Whiteboard",
    tech: "React.js · WebSockets · Canvas",
    category: "Real-time Collaboration",
    description: "Real-time collaborative whiteboard with freehand drawing, undo/redo, and synchronized canvas state across multiple clients.",
    link: "https://github.com/Saloni1707/sketch",
  },
  {
    title: "RL Racing Agent",
    tech: "Python · DQN · Neural Networks",
    category: "Reinforcement Learning",
    description: "DQN-based agent for autonomous driving in simulation. Uses experience replay and target networks to learn optimal driving policies.",
    link: "https://github.com/Saloni1707/Car_Racing",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="border-b border-border bg-background">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Section label */}
        <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-border p-6 md:p-8 lg:p-12">
          <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground sticky top-8">
            [ 03 — Selected Works ]
          </h2>
        </div>

        {/* Cards grid */}
        <div className="lg:col-span-8 p-6 md:p-8 lg:p-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                data-testid={`project-card-${index}`}
                className="group border border-border p-5 flex flex-col gap-3 hover:bg-foreground/[0.03] transition-colors duration-200"
              >
                {/* Top row: folder icon + links */}
                <div className="flex items-center justify-between">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-muted-foreground">
                    <path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z" />
                  </svg>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-github-${index}`}
                    aria-label={`GitHub — ${project.title}`}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                  </a>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-serif text-xl leading-snug mb-1">{project.title}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">{project.category}</p>
                </div>

                {/* Description */}
                <p className="font-sans text-sm leading-relaxed text-foreground/75 flex-1">
                  {project.description}
                </p>

                {/* Tech stack */}
                <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground pt-3 border-t border-border">
                  {project.tech}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
