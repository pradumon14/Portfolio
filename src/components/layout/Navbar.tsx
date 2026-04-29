import { useState, useEffect } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import { Home, Bug, Code2, Mail } from "lucide-react";

/**
 * Navbar Component
 * 
 * An ultra-minimalist, glassmorphic bottom-dock navigation bar inspired by
 * modern interfaces. Uses IntersectionObserver to track the active section
 * and Framer Motion for the fluid pill indicator.
 */

const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "research", icon: Bug, label: "Research" },
  { id: "projects", icon: Code2, label: "Projects" },
  { id: "contact", icon: Mail, label: "Contact" },
];

export function Navbar() {
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState("hero");

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

    // Track active section as user scrolls
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Trigger when section hits the vertical center
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    const timeouts: NodeJS.Timeout[] = [];
    // Slight delay to ensure elements are rendered before observing
    const timer = setTimeout(() => {
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      });
    }, 100);
    timeouts.push(timer);

    return () => {
      observer.disconnect();
      timeouts.forEach(clearTimeout);
    };
  }, []);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const scrolled = latest > 50;
    updateThemeColor(scrolled);
  });

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <>
      {/* Desktop Top Navbar (Hidden on Mobile) */}
      <div className="fixed top-6 lg:top-8 inset-x-0 z-[100] flex justify-center pointer-events-none hidden md:flex">
        <motion.nav
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center p-1.5 rounded-full bg-[#111113]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.02)]"
        >
          {/* Logo / Name */}
          <div className="pl-6 pr-4 py-2 border-r border-white/10 flex items-center">
            <span className="font-display font-medium text-white tracking-tight text-sm">
              Pradumon
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center px-2 gap-1 relative">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={`desktop-${item.id}`}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  className="relative px-4 py-2 rounded-full text-[13px] font-medium transition-colors duration-200 group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="desktop-active-pill"
                      className="absolute inset-0 bg-white/[0.12] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_0_12px_rgba(255,255,255,0.1)]"
                      transition={{ type: "spring", stiffness: 450, damping: 35 }}
                    />
                  )}
                  <span className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]' : 'text-neutral-400 group-hover:text-neutral-200'}`}>
                    {item.label}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="pr-1.5 pl-2 border-l border-white/10 flex items-center">
            <a
              href="mailto:pradumon14@gmail.com"
              className="group/btn relative inline-flex items-center justify-center p-[1.5px] rounded-full bg-gradient-to-b from-white/20 to-black/80 shadow-[0_4px_12px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.3)] border border-black hover:-translate-y-0.5 active:translate-y-px hover:shadow-[0_6px_16px_rgba(0,0,0,0.6)] active:shadow-none transition-all duration-300"
            >
              <div className="relative flex items-center justify-center px-5 py-1.5 rounded-full bg-gradient-to-b from-neutral-100 via-neutral-200 to-neutral-400 shadow-[inset_0_1.5px_2px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.2)] border border-neutral-500 overflow-hidden group-active/btn:shadow-[inset_0_4px_8px_rgba(0,0,0,0.4)] transition-all duration-300">
                <span className="relative z-10 text-[12px] font-bold tracking-wide text-neutral-900 drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)] group-active/btn:translate-y-px group-active/btn:drop-shadow-none transition-all">
                  Hire Me
                </span>
                {/* Fake gloss */}
                <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/80 to-transparent rounded-t-full pointer-events-none group-active/btn:opacity-0 transition-opacity duration-300" />
              </div>
            </a>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Bottom Navbar (Hidden on Desktop) */}
      <div className="fixed bottom-6 inset-x-0 z-[100] flex justify-center pointer-events-none px-6 md:hidden">
        <motion.nav
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto flex items-center p-2 rounded-full bg-[#111113]/80 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_40px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.02)]"
        >
          <div className="flex items-center gap-1 sm:gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;

              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleClick(e, item.id)}
                  aria-label={item.label}
                  className="relative px-5 sm:px-6 py-3.5 rounded-full flex items-center justify-center outline-none group"
                >
                  {isActive && (
                    <motion.div
                      layoutId="mobile-active-pill"
                      className="absolute inset-0 bg-white/[0.12] rounded-full shadow-[inset_0_1px_2px_rgba(255,255,255,0.1),0_0_12px_rgba(255,255,255,0.1)]"
                      transition={{
                        type: "spring",
                        stiffness: 450,
                        damping: 35,
                      }}
                    />
                  )}
                  <Icon
                    className={`relative z-10 w-[22px] h-[22px] transition-all duration-500 ease-out ${
                      isActive
                        ? "text-white scale-110 drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]"
                        : "text-neutral-500 group-hover:text-neutral-300 group-hover:scale-105"
                    }`}
                    strokeWidth={isActive ? 2.5 : 2}
                    // Bug shouldn't be filled entirely as it looks weird, but Home/Contact looks good filled.
                    fill={isActive && item.id !== 'research' && item.id !== 'projects' ? "currentColor" : "none"}
                  />
                </a>
              );
            })}
          </div>
        </motion.nav>
      </div>
    </>
  );
}
