import { ReactNode } from "react";

interface SocialLinkProps {
  href: string;
  icon: ReactNode;
  label?: string;
}

export function SocialLink({ href, icon, label }: SocialLinkProps) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      title={label}
      className="group/social relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-[#323236] to-[#111113] p-[2.5px] shadow-[0_10px_20px_rgba(0,0,0,0.5),0_6px_6px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-[#0a0a0c] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_2px_4px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.6)] transition-all duration-300"
    >
      <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2a2a2e] to-[#141416] flex items-center justify-center shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),inset_0_-4px_6px_rgba(0,0,0,0.8)] border border-[#3e3e42] group-active/social:shadow-[inset_0_6px_10px_rgba(0,0,0,0.9)] group-active/social:from-[#1a1a1c] group-active/social:to-[#0f0f11] transition-all">
        <div className="text-neutral-400 group-hover/social:text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] group-active/social:drop-shadow-none transition-colors">
          {icon}
        </div>
      </div>
    </a>
  );
}
