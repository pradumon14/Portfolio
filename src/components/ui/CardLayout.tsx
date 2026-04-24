import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Github, ArrowRight } from "lucide-react";
import { PortfolioItem } from "../../data/portfolioData";

export interface CardLayoutProps {
  key?: React.Key;
  item: PortfolioItem;
  isProject: boolean;
}

/**
 * CardLayout Component
 * 
 * A reusable, expandable card used for displaying both Research and Projects.
 * Handles interactive expansion, complex internal layout with motion,
 * and different link rendering based on project vs research types.
 */
export function CardLayout({ item, isProject }: CardLayoutProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const mainLink = isProject ? (item.links?.live || item.links?.github || "#") : "#";

  const handleCardClick = () => {
    // Prevent collapsing if the user is trying to highlight/select text
    if (window.getSelection()?.toString().length || 0 > 0) return;
    setIsExpanded(!isExpanded);
  };

  return (
    <motion.div
      layout
      onClick={handleCardClick}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="group relative bg-gradient-to-b from-[#111113] to-[#0a0a0c] shadow-[0_30px_60px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.05),inset_0_-2px_10px_rgba(0,0,0,0.5)] rounded-[2.5rem] pt-8 flex flex-col overflow-hidden border border-white/[0.04] transition-colors duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.08)] cursor-pointer"
    >
        {/* Global Inner Light Reflection */}
        <div className="absolute inset-0 rounded-[2.5rem] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03),_transparent_50%)]" />

        {/* Main Content Area (Dark) */}
        <div className="px-6 md:px-8 pb-8 flex flex-col flex-1 relative z-10">
            <motion.div layout className="flex flex-col flex-1">
                
                {/* Always Visible Context */}
                <motion.div layout className="flex flex-col w-full flex-shrink-0">
                    {/* Top Bar (Status + Badge) */}
                    <motion.div layout className="flex flex-wrap lg:flex-nowrap justify-between items-start gap-4 mb-8">
                        <div className="flex items-center gap-3 bg-black/40 px-3 py-1.5 rounded-full border border-white/[0.03] shadow-inner max-w-[80%]">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#ff4d00] shadow-[0_0_12px_rgba(255,77,0,1)] flex-shrink-0 animate-pulse" />
                            <span className="text-neutral-300 text-[11px] font-semibold tracking-wider uppercase truncate">
                                {item.tags && item.tags.length > 0 ? item.tags[0] : 'Listing'}
                            </span>
                        </div>
                        {item.customBadge && (
                          <div className="bg-[#ff4d00] text-black px-4 py-1.5 rounded-full text-[10px] sm:text-[11px] font-bold tracking-[0.2em] shadow-[0_0_15px_rgba(255,77,0,0.3)] uppercase lg:ml-2 text-right break-words flex-shrink-0">
                              {item.customBadge}
                          </div>
                        )}
                    </motion.div>

                    {/* Title Layout */}
                    <motion.div layout className="mb-6 flex flex-col items-start gap-5">
                      <h3 className="text-2xl lg:text-3xl font-display font-medium text-neutral-100 tracking-tight leading-[1.1] drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                          {item.title}
                      </h3>
                    </motion.div>

                    {/* Sub-description */}
                    {item.description && (
                        <motion.p layout className="text-neutral-400 font-light text-sm md:text-[15px] leading-relaxed tracking-wide">
                            {item.description}
                        </motion.p>
                    )}
                </motion.div>

                {/* Expandable Data Readout */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div 
                      key="content"
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: 32 }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                      className="flex flex-col gap-8 w-full overflow-hidden"
                    >
                        {item.keyFindings && (
                            <div className="space-y-4">
                               <span className="text-[11px] uppercase font-mono tracking-widest block text-[#ff4d00]/90 font-medium">Key Technical Findings</span>
                               <ul className="space-y-5">
                                 {item.keyFindings.map((finding: any, idx: number) => (
                                   <li key={idx} className="flex flex-col items-start gap-1.5">
                                      <span className="text-neutral-200 font-medium font-sans flex items-center gap-2.5 text-base">
                                         <span className="w-1.5 h-1.5 rounded-full bg-[#ff4d00] opacity-80 flex-shrink-0" />
                                         {finding.title}
                                      </span>
                                      <span className="text-neutral-400 leading-relaxed font-light pl-4">
                                        {finding.desc}
                                      </span>
                                   </li>
                                 ))}
                               </ul>
                            </div>
                        )}
                        {item.problem && (
                            <div className="space-y-2.5">
                               <span className="text-[11px] uppercase font-mono tracking-widest block text-[#ff4d00]/90 font-medium">Problem</span>
                               <p className="text-[15px] font-light leading-relaxed text-neutral-300">{item.problem}</p>
                            </div>
                        )}
                        {item.solution && (
                            <div className="space-y-2.5">
                               <span className="text-[11px] uppercase font-mono tracking-widest block text-[#ff4d00]/90 font-medium">Solution</span>
                               <p className="text-[15px] font-light leading-relaxed text-neutral-300">{item.solution}</p>
                            </div>
                        )}
                        {(item.highlight || item.impact) && (
                            <div className="flex flex-col gap-6">
                                {item.highlight && (
                                    <div className="space-y-2.5">
                                       <span className="text-[11px] uppercase font-mono tracking-widest block text-emerald-500/90 font-medium">Engineering</span>
                                       <p className="text-[15px] font-light leading-relaxed text-neutral-300">{item.highlight}</p>
                                    </div>
                                )}
                                {item.impact && (
                                    <div className="space-y-2.5">
                                       <span className="text-[11px] uppercase font-mono tracking-widest block text-sky-500/90 font-medium">Impact</span>
                                       <p className="text-[15px] font-light leading-relaxed text-neutral-300">{item.impact}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                  )}
                </AnimatePresence>
            </motion.div>

            {/* Bottom Extensible Indicator & Controls */}
            <motion.div layout className={`mt-10 flex items-end justify-between pointer-events-auto relative z-40 ${isExpanded ? 'border-t border-white/[0.05] pt-8' : ''}`}>
                
                {isProject ? (
                    <div className="flex flex-col items-start justify-end flex-1 h-12 pb-2">
                        <div className="flex items-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase select-none">
                                {isExpanded ? 'Tap to close' : 'Tap to view more'}
                            </span>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="absolute inset-x-0 bottom-0 flex justify-center items-end pb-2 h-12 pointer-events-none">
                            <div className="flex items-center opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-[10px] font-mono tracking-widest text-neutral-400 uppercase select-none">
                                    {isExpanded ? 'Tap to close' : 'Tap to view more'}
                                </span>
                            </div>
                        </div>
                        <div className="flex-1"></div>
                    </>
                )}

                <div className="flex justify-end gap-4 h-12 relative z-10">
                    {isProject && item.links?.github && (
                       <a 
                         href={item.links.github} 
                         target="_blank" 
                         rel="noreferrer" 
                         onClick={(e) => e.stopPropagation()}
                         aria-label="View Source on GitHub"
                         className="group/btn relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-[#323236] to-[#111113] p-[2.5px] shadow-[0_10px_20px_rgba(0,0,0,0.5),0_6px_6px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.1)] border border-[#0a0a0c] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_2px_4px_rgba(0,0,0,0.5),0_1px_2px_rgba(0,0,0,0.6)] transition-all duration-300"
                       >
                         <div className="w-full h-full rounded-full bg-gradient-to-b from-[#2a2a2e] to-[#141416] flex items-center justify-center shadow-[inset_0_2px_2px_rgba(255,255,255,0.1),inset_0_-4px_6px_rgba(0,0,0,0.8)] border border-[#3e3e42] group-active/btn:shadow-[inset_0_6px_10px_rgba(0,0,0,0.9)] group-active/btn:from-[#1a1a1c] group-active/btn:to-[#0f0f11] transition-all">
                           <Github className="w-5 h-5 text-neutral-400 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] group-active/btn:drop-shadow-none group-hover/btn:text-white transition-colors" />
                         </div>
                       </a>
                    )}
                    {mainLink !== "#" && (
                        <a 
                          href={mainLink} 
                          target="_blank" 
                          rel="noreferrer" 
                          onClick={(e) => e.stopPropagation()}
                          aria-label="View Live Details"
                          className="group/btn relative flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-b from-[#e64500] to-[#802600] p-[2.5px] shadow-[0_10px_20px_rgba(255,77,0,0.3),0_6px_6px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,160,120,0.5)] border border-[#4d1700] hover:-translate-y-1 active:translate-y-0.5 active:shadow-[0_2px_4px_rgba(255,77,0,0.2),0_1px_2px_rgba(0,0,0,0.5)] transition-all duration-300"
                        >
                          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#ff8c5a] to-[#ff4d00] flex items-center justify-center shadow-[inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-4px_6px_rgba(204,61,0,0.8)] border border-[#ff6a2b] group-active/btn:shadow-[inset_0_6px_10px_rgba(153,46,0,0.9)] group-active/btn:from-[#e64500] group-active/btn:to-[#cc3d00] transition-all">
                            <ArrowRight className="w-5 h-5 -rotate-45 text-[#331000] drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)] group-active/btn:drop-shadow-none group-active/btn:text-[#1a0800] transition-colors" />
                          </div>
                        </a>
                    )}
                </div>
            </motion.div>
        </div>
    </motion.div>
  );
}
