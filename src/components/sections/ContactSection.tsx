import { motion } from "motion/react";
import { Mail, Twitter, Linkedin, Github } from "lucide-react";
import { SocialLink } from "../ui/SocialLink";

export function ContactSection() {
  return (
    <motion.section 
       id="contact"
       initial={{ opacity: 0 }}
       whileInView={{ opacity: 1 }}
       viewport={{ once: true }}
       transition={{ duration: 0.6 }}
       className="relative bg-white/[0.03] backdrop-blur-md border border-white/[0.08] shadow-[0_8px_30px_rgb(0,0,0,0.5)] rounded-[3rem] p-12 md:p-20 text-center space-y-8 max-w-4xl mx-auto overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-brand-primary/10 via-transparent to-transparent opacity-50 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">Ready to collaborate?</h2>
        <p className="text-neutral-400 leading-relaxed text-base md:text-lg max-w-2xl mx-auto font-light">
          Whether you have a question about my research, a project proposal, or just want to say hi, my inbox is always open. Let's build a more secure digital future together.
        </p>
      </div>

      <div className="relative z-10 pt-4">
        <a 
          href="mailto:pradumon14@gmail.com"
          className="group/btn relative inline-flex items-center justify-center rounded-full bg-gradient-to-b from-[#e4e4e7] to-[#71717a] p-[3px] shadow-[0_10px_20px_rgba(0,0,0,0.4),0_6px_6px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.9)] border border-[#52525b] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_2px_4px_rgba(0,0,0,0.4),0_1px_2px_rgba(0,0,0,0.5)] transition-all duration-300"
        >
          <div className="flex items-center gap-3 px-8 py-3 md:py-4 rounded-full bg-gradient-to-b from-white to-[#e4e4e7] shadow-[inset_0_2px_4px_rgba(255,255,255,1),inset_0_-4px_6px_rgba(161,161,170,0.6)] border border-[#ffffff] group-active/btn:shadow-[inset_0_6px_10px_rgba(161,161,170,0.8)] group-active/btn:from-[#e4e4e7] group-active/btn:to-[#d4d4d8] transition-all">
            <Mail className="w-5 h-5 text-neutral-600 drop-shadow-[0_1px_0_rgba(255,255,255,1)] group-active/btn:drop-shadow-none group-active/btn:text-neutral-800 transition-colors" />
            <span className="text-[#18181b] font-bold tracking-wide drop-shadow-[0_1px_0_rgba(255,255,255,1)] group-active/btn:drop-shadow-none transition-all">
              Send a message
            </span>
          </div>
        </a>
      </div>

      <div className="relative z-10 pt-12 mt-12 border-t border-white/[0.05] flex flex-col items-center gap-6">
        <p className="text-[11px] font-mono tracking-widest uppercase text-neutral-500">Connect Elsewhere</p>
        <div className="flex items-center gap-5">
          <SocialLink href="https://x.com/pradumon14" icon={<Twitter className="w-5 h-5" />} label="X (Twitter)" />
          <SocialLink href="https://linkedin.com/in/pradumon14" icon={<Linkedin className="w-5 h-5" />} label="LinkedIn" />
          <SocialLink href="https://github.com/pradumon14" icon={<Github className="w-5 h-5" />} label="GitHub" />
        </div>
      </div>
    </motion.section>
  )
}
