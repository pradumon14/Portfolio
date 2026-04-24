import { motion } from "motion/react";
import { GithubWidget } from "../ui/GithubWidget";
import { SocialLink } from "../ui/SocialLink";
import { Twitter, Linkedin } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="space-y-8 h-[60vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-neutral-400 font-mono text-sm mb-4">Hello World, I am</h2>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-white leading-tight">
          Pradumon Sahani.
        </h1>
        <h3 className="text-2xl md:text-3xl text-neutral-400 font-display font-medium tracking-tight max-w-3xl">
          Independent Security Researcher & Developer.
        </h3>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg text-neutral-400 max-w-2xl leading-relaxed font-light"
      >
        I am an independent AI Security Researcher and developer. My work focuses on uncovering systemic vulnerabilities in complex platforms and analyzing the emerging security boundaries of multimodal Generative AI systems. From bypassing AI safety guardrails to building intelligent security tools, I operate at the intersection of offensive security and innovative engineering.
      </motion.p>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6"
      >
         <GithubWidget />
         
         <div className="flex items-center gap-4">
            <SocialLink href="https://x.com/pradumon14" icon={<Twitter className="w-5 h-5" />} label="X (Twitter)" />
            <SocialLink href="https://linkedin.com/in/pradumon14" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
         </div>
      </motion.div>
    </section>
  );
}
