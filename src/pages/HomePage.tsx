import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { VerionCanvas } from '../components/VerionCanvas';
import { ScrollReveal } from '../components/ScrollReveal';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onCursorChange: (type: 'default' | 'pointer' | 'rotate' | 'view') => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onCursorChange }) => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, window.scrollY / totalScroll)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full bg-[#08080a] text-[#f5f4f0]">
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-screen flex flex-col justify-between p-6 sm:p-12 md:p-16 overflow-hidden">
        {/* Top Header line */}
        <div className="pt-20 sm:pt-14 flex justify-between items-center text-[10px] sm:text-xs tracking-[0.25em] text-[#717178] uppercase z-20 font-mono">
          <span>VÉRION / 01</span>
          <span className="hidden sm:inline">AUTONOMOUS MECHANICAL ARCHITECTURE</span>
          <span>EST. 2026</span>
        </div>

        {/* Center 3D Object Canvas (Product emerges from darkness) */}
        <div
          className="absolute inset-0 z-10 flex items-center justify-center"
          onMouseEnter={() => onCursorChange('rotate')}
          onMouseLeave={() => onCursorChange('default')}
        >
          <VerionCanvas
            mode="hero"
            scrollProgress={scrollProgress}
            className="w-full h-full"
          />
        </div>

        {/* Hero Title & Minimal Luxury Typography */}
        <div className="relative z-20 max-w-2xl py-12 pointer-events-none select-none">
          <h1 className="editorial-headline text-5xl sm:text-7xl md:text-8xl lg:text-[6.5rem] tracking-tight text-[#f5f4f0] font-light leading-[0.94]">
            ENGINEERED<br />
            TO BE<br />
            DESIRED.
          </h1>
        </div>

        {/* Bottom Bar: Hero Details & Explore CTA */}
        <div className="relative z-20 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-4">
          <div className="space-y-1.5">
            <p className="text-xs sm:text-sm tracking-[0.22em] font-medium text-[#f5f4f0] uppercase font-display">
              VÉRION ONE
            </p>
            <p className="text-[11px] tracking-[0.22em] text-[#85858e] uppercase font-mono">
              Titanium / Sapphire / Ceramic
            </p>
          </div>

          <button
            id="hero-explore-cta"
            onClick={() => onNavigate('product')}
            onMouseEnter={() => onCursorChange('pointer')}
            onMouseLeave={() => onCursorChange('default')}
            className="group flex items-center space-x-3 text-xs tracking-[0.25em] text-[#f5f4f0] uppercase border-b border-[#f5f4f0]/40 pb-1 hover:border-[#f5f4f0] transition-colors focus:outline-hidden"
          >
            <span>Explore</span>
            <span className="transform transition-transform duration-300 group-hover:translate-x-1.5">
              →
            </span>
          </button>
        </div>
      </section>

      {/* 2. PRODUCT REVEAL ON SCROLL (Asymmetrical Editorial Composition) */}
      <section className="relative py-32 sm:py-48 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center">
          {/* Left Editorial Narrative Column with ScrollReveal */}
          <div className="lg:col-span-5 space-y-28">
            {/* Step 01 */}
            <ScrollReveal direction="up" delay={0.1}>
              <div className="space-y-4 max-w-md">
                <span className="editorial-caption">01 / ARCHITECTURE</span>
                <h2 className="font-serif text-4xl sm:text-5xl text-[#f5f4f0] font-light">
                  FORM
                </h2>
                <p className="text-sm text-[#92929c] leading-relaxed font-light">
                  A monolithic unibody carved from aerospace-grade Grade 5 titanium. Every chamfer is machined within five microns of tolerance, balanced to sit weightlessly upon the wrist.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 02 */}
            <ScrollReveal direction="up" delay={0.15}>
              <div className="space-y-4 max-w-md">
                <span className="editorial-caption">02 / SUBSTANCE</span>
                <h2 className="font-serif text-4xl sm:text-5xl text-[#f5f4f0] font-light">
                  MATERIAL
                </h2>
                <p className="text-sm text-[#92929c] leading-relaxed font-light">
                  Deep matte zirconium ceramic dial paired with synthetic monocrystalline sapphire crystal. Hardness second only to diamond, offering total optical purity under direct studio light.
                </p>
              </div>
            </ScrollReveal>

            {/* Step 03 */}
            <ScrollReveal direction="up" delay={0.2}>
              <div className="space-y-4 max-w-md">
                <span className="editorial-caption">03 / MECHANISM</span>
                <h2 className="font-serif text-4xl sm:text-5xl text-[#f5f4f0] font-light">
                  PRECISION
                </h2>
                <p className="text-sm text-[#92929c] leading-relaxed font-light">
                  A tactile knurled actuator engineered with micro-detent feedback. Pure mechanical sensation merged with contemporary silent kinetic efficiency.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Product Spotlight View with ScrollReveal */}
          <div className="lg:col-span-7 h-[540px] sm:h-[680px] relative">
            <ScrollReveal direction="none" delay={0.2} className="sticky top-24 w-full h-[500px] sm:h-[620px]">
              <div className="w-full h-full bg-[#0c0c0e] border border-[#1a1a1f] p-4">
                <div className="absolute top-6 left-6 z-20 text-[10px] tracking-[0.2em] text-[#787884] uppercase font-mono">
                  Interactive Specimen / Fig. 01
                </div>
                <div
                  className="w-full h-full"
                  onMouseEnter={() => onCursorChange('rotate')}
                  onMouseLeave={() => onCursorChange('default')}
                >
                  <VerionCanvas
                    mode="interactive"
                    caseMaterial="titanium"
                    finish="brushed"
                    strap="graphite"
                    className="w-full h-full"
                  />
                </div>
                <div className="absolute bottom-6 right-6 z-20 text-[10px] tracking-[0.2em] text-[#6b6b75] uppercase pointer-events-none font-mono">
                  360° Drag to Inspect
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. LARGE EDITORIAL PHOTOGRAPHIC SECTION */}
      <section className="relative w-full overflow-hidden bg-[#060608]">
        <ScrollReveal direction="none" duration={1.1}>
          <div
            className="relative w-full h-[75vh] sm:h-[88vh] overflow-hidden group"
            onMouseEnter={() => onCursorChange('view')}
            onMouseLeave={() => onCursorChange('default')}
          >
            {/* Authentic architectural/industrial photography with dark studio lighting */}
            <img
              src="https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=2600&auto=format&fit=crop"
              alt="VÉRION ONE Titanium Materiality"
              className="w-full h-full object-cover object-center filter grayscale contrast-120 brightness-75 transition-all duration-700 group-hover:brightness-85"
              referrerPolicy="no-referrer"
              loading="lazy"
            />

            {/* Minimalist physical caption */}
            <div className="absolute bottom-10 left-6 sm:left-14 z-20 space-y-1">
              <span className="editorial-caption text-[#8a8a92]">Campaign Document</span>
              <p className="font-serif text-xl sm:text-2xl text-[#f5f4f0] font-light tracking-wide">
                VÉRION ONE / 2026
              </p>
            </div>

            <div className="absolute bottom-10 right-6 sm:right-14 z-20 text-[11px] tracking-[0.2em] text-[#787880] uppercase font-mono">
              Edition 01 / Studio Zurich
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. FINAL EDITORIAL STATEMENT */}
      <section className="py-36 sm:py-48 px-6 sm:px-12 md:px-20 text-center max-w-5xl mx-auto space-y-14">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="space-y-6">
            <p className="editorial-caption">The Philosophy</p>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#f5f4f0] leading-[1.05] tracking-tight">
              SOME OBJECTS<br />
              ARE MADE TO BE USED.
            </h2>
            <div className="py-3">
              <div className="w-12 h-px bg-[#26262c] mx-auto" />
            </div>
            <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#9b9ba4] leading-[1.05] tracking-tight">
              OTHERS ARE MADE<br />
              TO BE REMEMBERED.
            </h2>
          </div>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.2}>
          <div>
            <button
              id="home-discover-cta"
              onClick={() => onNavigate('shop')}
              onMouseEnter={() => onCursorChange('pointer')}
              onMouseLeave={() => onCursorChange('default')}
              className="group inline-flex items-center space-x-4 py-3.5 px-8 border border-[#2b2b32] text-xs uppercase tracking-[0.25em] text-[#f5f4f0] hover:border-[#f5f4f0] transition-colors focus:outline-hidden"
            >
              <span>Discover VÉRION ONE</span>
              <span className="transform transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
        </ScrollReveal>
      </section>

      {/* Editorial Footer */}
      <footer className="border-t border-[#1a1a1f] py-14 px-6 sm:px-12 md:px-20 text-[10px] tracking-[0.22em] text-[#696972] uppercase flex flex-col sm:flex-row justify-between items-center gap-6 font-mono">
        <div>© 2026 VÉRION ATELIER. ALL RIGHTS RESERVED.</div>
        <div className="flex space-x-8">
          <span>GENEVA</span>
          <span>ZURICH</span>
          <span>TOKYO</span>
        </div>
      </footer>
    </div>
  );
};
