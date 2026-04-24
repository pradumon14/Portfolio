import { motion } from "motion/react";
import { CardLayout } from "../ui/CardLayout";
import { projects } from "../../data/portfolioData";

export function ProjectsSection() {
  return (
    <motion.section 
       id="projects"
       initial={{ opacity: 0 }}
       whileInView={{ opacity: 1 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6 }}
       className="space-y-12"
    >
       <div className="flex items-center justify-between mb-8">
         <div className="flex items-center space-x-6 flex-1">
           <h2 className="text-3xl font-display font-medium text-white tracking-tight">Featured Projects</h2>
           <div className="h-px bg-white/10 flex-1 hidden md:block" />
         </div>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
         {projects.map((project, i) => (
            <CardLayout key={i} item={project} isProject={true} />
         ))}
       </div>
    </motion.section>
  )
}
