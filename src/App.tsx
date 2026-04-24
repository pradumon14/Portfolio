/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from "./components/layout/Navbar";
import { HeroSection } from "./components/sections/HeroSection";
import { ResearchSection } from "./components/sections/ResearchSection";
import { ProjectsSection } from "./components/sections/ProjectsSection";
import { ContactSection } from "./components/sections/ContactSection";

export default function App() {
  return (
    <div className="min-h-screen bg-black text-neutral-50 selection:bg-brand-primary/20 font-sans relative">
      {/* Global Film Grain / Noise Overlay */}
      <div 
        className="fixed inset-0 z-[100] pointer-events-none opacity-[0.04] mix-blend-screen"
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px'
        }}
      />
      
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-900/20 via-black to-black -z-10" />
      
      <Navbar />
      
      <main className="max-w-5xl mx-auto px-6 py-32 md:py-48 space-y-40">
        <HeroSection />
        <ResearchSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}
