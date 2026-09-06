import React from 'react';
import { PageId } from '../types';
import { ScrollReveal } from '../components/ScrollReveal';

interface ExperiencePageProps {
  onNavigate: (page: PageId) => void;
  onCursorChange: (type: 'default' | 'pointer' | 'rotate' | 'view') => void;
}

export const ExperiencePage: React.FC<ExperiencePageProps> = ({ onNavigate, onCursorChange }) => {
  return (
    <div className="w-full bg-[#08080a] text-[#f5f4f0] pt-24 sm:pt-28 overflow-hidden">
      {/* 1. EDITORIAL OPENING */}
      <section className="px-6 sm:px-12 md:px-20 max-w-7xl mx-auto py-20 sm:py-28">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="max-w-4xl space-y-6">
            <span className="editorial-caption">Spatial Journal / 04</span>
            <h1 className="editorial-headline text-5xl sm:text-7xl md:text-8xl text-[#f5f4f0] font-light">
              DESIGNED FOR<br />
              THE MOMENTS<br />
              BETWEEN MOMENTS.
            </h1>
            <p className="text-sm text-[#8c8c96] max-w-md leading-relaxed pt-2 font-light">
              True luxury does not clamor for attention. It is the subtle weight on your wrist as the transatlantic flight touches down in Zurich; the silent tactile feedback in an empty boardroom at dusk.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. ASYMMETRICAL EDITORIAL COMPOSITION 01: Full-Bleed Architectural Solitude */}
      <section className="relative w-full py-12">
        <ScrollReveal direction="none" duration={1.1}>
          <div
            className="relative w-full h-[70vh] sm:h-[85vh] bg-[#0c0c0e] overflow-hidden group"
            onMouseEnter={() => onCursorChange('view')}
            onMouseLeave={() => onCursorChange('default')}
          >
            <img
              src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=2400&auto=format&fit=crop"
              alt="Minimalist architectural space with hard morning shadows"
              className="w-full h-full object-cover filter grayscale contrast-120 brightness-80 transition-all duration-700 group-hover:brightness-90"
              referrerPolicy="no-referrer"
              loading="lazy"
            />

            {/* Typography overlay */}
            <div className="absolute top-12 left-6 sm:left-16 z-20 max-w-md">
              <span className="editorial-caption text-[#8a8a92]">Scene 01 / Spatial Silence</span>
              <p className="font-serif text-2xl sm:text-4xl text-[#f5f4f0] mt-2 font-light">
                ARCHITECTURE IN MINIATURE
              </p>
            </div>

            <div className="absolute bottom-10 right-6 sm:right-16 z-20 text-[10px] tracking-[0.25em] text-[#717178] uppercase font-mono">
              3,400M · HIGH ALPINE OBSERVATORY
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. ASYMMETRICAL COMPOSITION 02: Narrow Column & Wide Canvas Pair */}
      <section className="py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Narrow text column */}
          <div className="lg:col-span-4 space-y-6">
            <ScrollReveal direction="up" delay={0.1}>
              <span className="editorial-caption">Tactility & Ergonomics</span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f4f0] font-light">
                THE BALANCE OF MASS
              </h2>
              <p className="text-xs sm:text-sm text-[#95959f] leading-relaxed font-light mt-3">
                At 58 grams, the titanium unibody distributes inertia symmetrically across the ulna bone. It neither slides during rapid movement nor binds during stillness.
              </p>
              <div className="pt-4 text-[10px] tracking-[0.2em] text-[#696970] uppercase font-mono">
                Tested over 500,000 wrist cycles
              </div>
            </ScrollReveal>
          </div>

          {/* Offset Image with unexpected placement */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="up" delay={0.2}>
              <div
                className="overflow-hidden bg-[#101013] border border-[#1b1b20] aspect-[16/10] group"
                onMouseEnter={() => onCursorChange('view')}
                onMouseLeave={() => onCursorChange('default')}
              >
                <img
                  src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2000&auto=format&fit=crop"
                  alt="Sculptural industrial surface detail"
                  className="w-full h-full object-cover filter grayscale contrast-120 brightness-75 transition-all duration-700 group-hover:brightness-85"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4. ASYMMETRICAL COMPOSITION 03: Overlapping Photography */}
      <section className="py-24 bg-[#0a0a0d] border-t border-[#17171a]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
            <div className="md:col-span-7">
              <ScrollReveal direction="up" delay={0.1}>
                <div
                  className="aspect-[4/3] overflow-hidden bg-[#101014] border border-[#1b1b20]"
                  onMouseEnter={() => onCursorChange('view')}
                  onMouseLeave={() => onCursorChange('default')}
                >
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop"
                    alt="Bespoke tailored cuff and titanium watch interaction"
                    className="w-full h-full object-cover filter grayscale contrast-120 brightness-70 transition-all duration-700 hover:brightness-85"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            </div>

            <div className="md:col-span-5 md:-ml-8 md:mb-12 z-20">
              <ScrollReveal direction="up" delay={0.25}>
                <div className="space-y-6 bg-[#08080a] p-8 sm:p-10 border border-[#1e1e24] shadow-2xl">
                  <span className="editorial-caption">Private Intimacy</span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#f5f4f0] font-light">
                    EFFORTLESS REFINEMENT
                  </h3>
                  <p className="text-xs text-[#8f8f98] leading-relaxed font-light">
                    Worn under a crisp sea island cotton sleeve or exposed against winter cashmere, VÉRION ONE settles into your daily cadence without pretension.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL CONCLUSION */}
      <section className="py-36 px-6 text-center max-w-4xl mx-auto space-y-8">
        <ScrollReveal direction="up" delay={0.1}>
          <span className="editorial-caption">The Flagship Experience</span>
          <h2 className="font-serif text-4xl sm:text-6xl text-[#f5f4f0] font-light">
            YOUR ALLOCATION AWAITS
          </h2>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('shop')}
              onMouseEnter={() => onCursorChange('pointer')}
              onMouseLeave={() => onCursorChange('default')}
              className="px-8 py-3.5 bg-[#f5f4f0] text-[#08080a] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#dedcd5] transition-colors focus:outline-hidden"
            >
              Configure Your Piece
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

