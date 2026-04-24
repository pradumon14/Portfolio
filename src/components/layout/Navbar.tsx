import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Home, Bug, Code2, Mail } from "lucide-react";

/**
 * Navbar Component
 * 
 * Includes a sleek dynamic desktop nav and a bottom-docked mobile nav.
 * It also dynamically updates the document's theme-color based on scroll.
 */
export function Navbar() {
  const { scrollY } = useScroll();
  const [, setIsScrolled] = useState(false);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  // Initialization and dynamic updates for mobile browser status bar
  const updateThemeColor = (scrolled: boolean) => {
    let metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (!metaThemeColor) {
      metaThemeColor = document.createElement('meta');
      metaThemeColor.setAttribute('name', 'theme-color');
      document.head.appendChild(metaThemeColor);
    }
    // Deep black when at top, slightly elevated dark (#0a0a0c) when scrolled
    metaThemeColor.setAttribute('content', scrolled ? '#0a0a0c' : '#000000');
  };

  useEffect(() => {
    updateThemeColor(window.scrollY > 50);
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 50;
    setIsScrolled(scrolled);
    updateThemeColor(scrolled);
  });

  const navItems = [
    { id: "home", name: "Home", href: "#hero", icon: <Home className="w-5 h-5" /> },
    { id: "research", name: "Research", href: "#research", icon: <Bug className="w-5 h-5" /> },
    { id: "projects", name: "Projects", href: "#projects", icon: <Code2 className="w-5 h-5" /> },
    { id: "contact", name: "Contact", href: "#contact", icon: <Mail className="w-5 h-5" /> },
  ];

  return (
    <>
      {/* Desktop Top Navbar (Hidden on Mobile) */}
      <div className="fixed top-6 inset-x-0 z-50 justify-center pointer-events-none hidden md:flex">
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`pointer-events-auto flex items-center p-[4px] rounded-full bg-gradient-to-b from-[#3a3a40]/95 via-[#1f1f22]/95 to-[#050505]/95 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.8),0_10px_10px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-[#000] transition-all duration-500`}
        >
          <div className="flex items-center w-full h-full rounded-full bg-gradient-to-b from-[#0a0a0c] to-[#050505] shadow-[inset_0_3px_8px_rgba(0,0,0,0.9),inset_0_-1px_1px_rgba(255,255,255,0.05)] border border-[#1a1a1c] px-3 py-2">
            {/* Simple Text Logo */}
            <div className="px-5 py-2 pr-6 border-r border-[#222] flex items-center">
              <span className="font-display font-bold text-white tracking-tighter text-lg [text-shadow:0_2px_4px_rgba(0,0,0,0.8),0_-1px_0_rgba(255,255,255,0.1)]">
                Pradumon
              </span>
            </div>

            {/* Links */}
            <div className="flex items-center px-3 gap-2 relative">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onMouseEnter={() => setHoveredTab(item.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={`group/navitem relative px-6 py-2 text-sm font-medium transition-all duration-200 rounded-full [text-shadow:0_-1px_1px_rgba(0,0,0,0.8)] active:scale-95 active:text-white/70 ${hoveredTab === item.id ? 'text-white' : 'text-[#888]'}`}
                >
                  {hoveredTab === item.id && (
                    <motion.div
                      layoutId="desktop-nav-indicator"
                      className="absolute inset-0 bg-gradient-to-b from-[#1a1a1c] to-[#111113] rounded-full shadow-[inset_0_2px_5px_rgba(0,0,0,0.9),0_1px_1px_rgba(255,255,255,0.05)] border border-[#222]"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-200 ${hoveredTab === item.id ? 'drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]' : ''}`}>{item.name}</span>
                </a>
              ))}
            </div>
            
            <div className="pl-5 pr-1 border-l border-[#222] flex items-center">
               <a
                href="mailto:pradumon14@gmail.com"
                className="group/hire relative inline-flex items-center justify-center p-[2px] rounded-full bg-gradient-to-b from-[#444] via-[#222] to-[#0a0a0c] shadow-[0_5px_15px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.2)] border border-black hover:-translate-y-0.5 active:translate-y-px transition-all duration-200"
              >
                <div className="relative flex items-center justify-center px-6 py-2 rounded-full overflow-hidden bg-gradient-to-b from-[#ff7833] via-[#e64500] to-[#992e00] shadow-[inset_0_1px_0_rgba(255,255,255,0.6),inset_0_3px_6px_rgba(255,255,255,0.3),inset_0_-3px_6px_rgba(0,0,0,0.5),0_0_12px_rgba(255,77,0,0.4)] border border-[#661e00] group-active/hire:shadow-[inset_0_4px_10px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(0,0,0,0.9),0_0_0_rgba(255,77,0,0)] transition-all duration-200">
                  <span className="relative z-10 text-[12px] font-bold uppercase tracking-widest text-[#fff] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] group-active/hire:translate-y-[1px] group-active/hire:drop-shadow-none transition-all">
                    Hire Me
                  </span>
                  {/* Fake gloss highlight */}
                  <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-full pointer-events-none group-active/hire:opacity-0 transition-opacity" />
                </div>
              </a>
            </div>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Bottom Navbar (Hidden on Desktop) */}
      <div className="fixed bottom-6 inset-x-0 z-50 flex justify-center pointer-events-none md:hidden px-6">
        <motion.nav
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="pointer-events-auto flex w-full max-w-sm rounded-[2rem] p-[4px] bg-gradient-to-b from-[#3a3a40]/95 via-[#1f1f22]/95 to-[#050505]/95 backdrop-blur-3xl shadow-[0_20px_40px_rgba(0,0,0,0.9),0_10px_10px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.15)] border border-[#000]"
        >
          <div className="flex items-center justify-between w-full h-full rounded-[1.8rem] bg-gradient-to-b from-[#0a0a0c] to-[#050505] shadow-[inset_0_3px_8px_rgba(0,0,0,0.9),inset_0_-1px_1px_rgba(255,255,255,0.05)] border border-[#1a1a1c] px-4 py-2.5">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="relative p-3 text-[#888] hover:text-white transition-all duration-200 rounded-2xl flex flex-col items-center gap-1 group/m-nav active:scale-[0.92] active:text-white/70 flex-1 [text-shadow:0_-1px_1px_rgba(0,0,0,0.8)]"
              >
                <div className="group-hover/m-nav:-translate-y-1 transition-transform duration-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {item.icon}
                </div>
              </a>
            ))}
          </div>
        </motion.nav>
      </div>
    </>
  );
}
