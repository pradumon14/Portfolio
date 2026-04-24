import { motion } from "motion/react";
import { CardLayout } from "../ui/CardLayout";
import { researchItems } from "../../data/portfolioData";

export function ResearchSection() {
  return (
    <motion.section 
        id="research"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-12 mt-20"
    >
        <div className="flex items-center space-x-6 mb-12">
            <h2 className="text-3xl font-display font-medium text-white tracking-tight">Security Research</h2>
            <div className="h-px bg-white/10 flex-1 hidden md:block" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {researchItems.map((item, i) => (
                <CardLayout key={i} item={item} isProject={false} />
            ))}
        </div>
    </motion.section>
  );
}
