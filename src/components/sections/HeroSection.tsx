import { motion } from "motion/react";
import { GithubWidget } from "../ui/GithubWidget";
import { SocialLink } from "../ui/SocialLink";
import { Twitter, Linkedin, Send } from "lucide-react";

export function HeroSection() {
  return (
    <section id="hero" className="space-y-6 pt-12 md:pt-0 min-h-[50vh] flex flex-col justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-neutral-500 font-mono text-[11px] uppercase tracking-[0.2em] mb-4">Hello World, I am</h2>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6 text-white leading-tight">
          Pradumon Sahani.
        </h1>
        <h3 className="text-xl md:text-2xl text-neutral-400 font-display font-medium tracking-tight max-w-3xl">
          Independent Security Researcher & Developer.
        </h3>
      </motion.div>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-lg text-neutral-400 max-w-2xl leading-relaxed font-light"
      >
        I am an independent security researcher and software developer. My passion is exploring the limits of technology by finding its flaws. I've uncovered critical vulnerabilities in major platforms—from zero-click bypasses in WhatsApp to breaking the safety guardrails of Google's AI. But I don't just break systems; I build them. Whether it's crafting intelligent tools to detect zero-day phishing or designing interactive educational platforms, I thrive at the intersection of offensive security and creative engineering.
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
            <SocialLink href="https://t.me/pradumon14" icon={<Send className="w-5 h-5 pb-[2px] pr-[2px] translate-x-[1px]" />} label="Telegram" />
         </div>
      </motion.div>
    </section>
  );
}
