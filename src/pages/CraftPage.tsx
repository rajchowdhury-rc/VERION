import React, { useState } from 'react';
import { PageId } from '../types';
import { VerionCanvas } from '../components/VerionCanvas';
import { ScrollReveal } from '../components/ScrollReveal';

interface CraftPageProps {
  onNavigate: (page: PageId) => void;
  onCursorChange: (type: 'default' | 'pointer' | 'rotate' | 'view') => void;
}

export const CraftPage: React.FC<CraftPageProps> = ({ onNavigate, onCursorChange }) => {
  const [craftProgress, setCraftProgress] = useState(0.65);

  const craftStages = [
    {
      step: '01',
      title: 'RAW TITANIUM',
      caption: 'Grade 5 aerospace titanium ingot sourced from vacuum-arc remelt smelters.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
      metric: '99.4% Density',
    },
    {
      step: '02',
      title: 'FIVE-AXIS MACHINING',
      caption: 'Continuous 48-hour CNC milling within 5 microns of architectural geometry.',
      image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
      metric: '0.005mm Tolerance',
    },
    {
      step: '03',
      title: 'CERAMIC SINTERING',
      caption: 'Zirconium dioxide heated at 1,500°C to achieve diamond-level surface hardness.',
      image: 'https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop',
      metric: '1,500°C Furnace',
    },
    {
      step: '04',
      title: 'HAND POLISHING',
      caption: 'Master lapidaries apply hairline brushed texture and mirror-polished chamfers.',
      image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=1200&auto=format&fit=crop',
      metric: '14 Hours Per Case',
    },
    {
      step: '05',
      title: 'SAPPHIRE CUTTING',
      caption: 'Diamond-tipped laser cutting of monocrystalline sapphire crystal lenses.',
      image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop',
      metric: '9 Mohs Hardness',
    },
    {
      step: '06',
      title: 'CLEANROOM ASSEMBLY',
      caption: 'Class 1,000 pressurized laboratory assembly with inert nitrogen purge.',
      image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop',
      metric: 'ISO 6 Cleanroom',
    },
    {
      step: '07',
      title: 'FINAL INSPECTION',
      caption: 'Automated laser interferometry and 10-day acoustic pressure chamber validation.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
      metric: '100% Inspected',
    },
  ];

  return (
    <div className="w-full bg-[#08080a] text-[#f5f4f0] pt-24 sm:pt-28">
      {/* 1. DOCUMENTARY OPENING */}
      <section className="px-6 sm:px-12 md:px-20 max-w-7xl mx-auto py-16 sm:py-24">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="space-y-6 max-w-4xl">
            <span className="editorial-caption">Atelier Documentary / Chapter 03</span>
            <div className="space-y-1">
              <h1 className="editorial-headline text-5xl sm:text-7xl md:text-8xl text-[#f5f4f0] font-light">
                NOT MASS PRODUCED.
              </h1>
              <h1 className="editorial-headline text-5xl sm:text-7xl md:text-8xl text-[#787882] font-light">
                PRECISION PRODUCED.
              </h1>
            </div>
            <p className="text-sm text-[#92929c] max-w-xl leading-relaxed pt-4 font-light">
              Every VÉRION ONE begins as a solid billet of aerospace-grade titanium. Guided by Swiss watchmaking traditions and modern micro-engineering, each component takes over three weeks to forge, machine, and assemble.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. HERO INTERACTION: BILLET TO FINISHED OBJECT TRANSFORMATION */}
      <section className="py-16 bg-[#0a0a0d] border-y border-[#18181c]">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20">
          <ScrollReveal direction="up" delay={0.1}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-10">
              <div>
                <span className="editorial-caption">Interactive Transformation</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f4f0] mt-1 font-light">
                  THE MORPHOLOGY
                </h2>
              </div>
              <div className="text-left md:text-right space-y-1 font-mono">
                <span className="text-[10px] tracking-[0.25em] text-[#696972] uppercase">
                  Phase {Math.round(craftProgress * 100)}% Complete
                </span>
                <p className="text-xs text-[#a1a1aa]">
                  {craftProgress < 0.3
                    ? 'Raw Titanium Billet Block'
                    : craftProgress < 0.7
                    ? 'High-Precision 5-Axis CNC Milling'
                    : 'Hand-Polished Monolithic VÉRION ONE'}
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive 3D Transformation Canvas */}
          <ScrollReveal direction="none" delay={0.15}>
            <div className="relative h-[480px] sm:h-[620px] bg-[#0c0c0e] border border-[#1d1d22]">
              <VerionCanvas
                mode="craft"
                craftProgress={craftProgress}
                interactive={true}
                className="w-full h-full"
                onHoverState={(hovering) => onCursorChange(hovering ? 'rotate' : 'default')}
              />

              {/* Stage markers overlay */}
              <div className="absolute top-6 left-6 z-20 text-[10px] tracking-[0.2em] text-[#82828e] uppercase font-mono bg-[#08080a]/70 px-2.5 py-1 border border-[#1a1a20]">
                Transformation State / {Math.round(craftProgress * 100)}%
              </div>
              <div className="absolute bottom-6 left-6 z-20 text-[10px] tracking-[0.2em] text-[#6b6b75] uppercase font-mono pointer-events-none">
                360° Drag to Rotate View
              </div>
            </div>
          </ScrollReveal>

          {/* Interactive Range Scrubber */}
          <div className="mt-8 space-y-3 max-w-xl mx-auto text-center">
            <div className="flex justify-between text-[10px] tracking-[0.2em] uppercase text-[#72727e] font-mono">
              <span>Raw Billet</span>
              <span>Machining</span>
              <span>Finished Object</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={craftProgress}
              onChange={(e) => setCraftProgress(parseFloat(e.target.value))}
              className="w-full h-1 bg-[#222228] rounded-lg appearance-none cursor-ew-resize accent-[#f5f4f0]"
            />
            <p className="text-[11px] text-[#85858e] tracking-wider font-mono">
              Drag the progression line to witness the material subtraction process
            </p>
          </div>
        </div>
      </section>

      {/* 3. MACRO DOCUMENTARY JOURNAL (7 Stages) */}
      <section className="py-32 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto space-y-24">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="space-y-3">
            <span className="editorial-caption">Documentary Sequence</span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#f5f4f0] font-light">
              SEVEN DISCIPLINES
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
          {craftStages.map((stage, index) => (
            <ScrollReveal
              key={stage.step}
              delay={index * 0.1}
              direction="up"
            >
              <div
                className="space-y-5 group"
                onMouseEnter={() => onCursorChange('view')}
                onMouseLeave={() => onCursorChange('default')}
              >
                <div className="relative overflow-hidden aspect-[4/3] bg-[#0d0d10] border border-[#1b1b22]">
                  <img
                    src={stage.image}
                    alt={stage.title}
                    className="w-full h-full object-cover filter grayscale contrast-120 brightness-80 transition-all duration-500 group-hover:brightness-95"
                    referrerPolicy="no-referrer"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4 bg-[#08080a]/85 backdrop-blur-xs px-2.5 py-1 text-[9px] tracking-[0.2em] uppercase text-[#f5f4f0] font-mono border border-[#22222a]">
                    {stage.metric}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-[10px] tracking-[0.25em] text-[#71717a] uppercase font-mono">
                    <span>Stage {stage.step}</span>
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#f5f4f0] font-light">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#90909a] leading-relaxed font-light">
                    {stage.caption}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. Atelier Guarantee Footnote */}
      <section className="py-24 border-t border-[#18181c] text-center max-w-3xl mx-auto px-6 space-y-6">
        <ScrollReveal direction="up" delay={0.1}>
          <span className="editorial-caption">Craftsmanship Covenant</span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#f5f4f0] font-light">
            LIMITED ANNUAL PRODUCTION
          </h3>
          <p className="text-xs text-[#8f8f96] leading-relaxed font-light">
            Due to the exacting requirements of our five-axis milling and hand lapidary processes, no more than 1,000 units are completed each calendar year.
          </p>
          <div className="pt-4">
            <button
              onClick={() => onNavigate('shop')}
              onMouseEnter={() => onCursorChange('pointer')}
              onMouseLeave={() => onCursorChange('default')}
              className="px-8 py-3.5 border border-[#2e2e36] text-xs uppercase tracking-[0.25em] text-[#f5f4f0] hover:border-[#f5f4f0] transition-colors focus:outline-hidden"
            >
              Check Allocation Availability →
            </button>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
