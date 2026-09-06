import React, { useState } from 'react';
import { PageId } from '../types';
import { VerionCanvas } from '../components/VerionCanvas';
import { ScrollReveal } from '../components/ScrollReveal';

interface ProductPageProps {
  onNavigate: (page: PageId) => void;
  onCursorChange: (type: 'default' | 'pointer' | 'rotate' | 'view') => void;
}

export const ProductPage: React.FC<ProductPageProps> = ({ onNavigate, onCursorChange }) => {
  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);

  const annotations = [
    {
      id: 'titanium',
      title: 'TITANIUM',
      subtitle: 'GRADE 5 BILLET',
      description: 'A lightweight architectural shell engineered for everyday wear. Five-axis milled and hand-finished with hairline brushing.',
      positionClasses: 'top-[22%] left-[8%] sm:left-[12%]',
      lineDirection: 'right',
    },
    {
      id: 'sapphire',
      title: 'SAPPHIRE',
      subtitle: 'MONOCRYSTALLINE',
      description: 'A precision-cut surface designed for exceptional clarity. Multi-layer anti-reflective treatment eliminates chromatic aberration.',
      positionClasses: 'top-[36%] right-[8%] sm:right-[12%]',
      lineDirection: 'left',
    },
    {
      id: 'ceramic',
      title: 'CERAMIC',
      subtitle: 'ZIRCONIUM DIOXIDE',
      description: 'A smooth tactile layer with a distinctive finish. Sintered at 1,500°C for extreme surface density and permanent luster.',
      positionClasses: 'bottom-[20%] left-[8%] sm:left-[14%]',
      lineDirection: 'right',
    },
  ];

  return (
    <div className="w-full bg-[#08080a] text-[#f5f4f0] pt-24 sm:pt-28">
      {/* 1. SHOWROOM OPENING */}
      <section className="px-6 sm:px-12 md:px-20 max-w-7xl mx-auto pt-8 pb-4">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="flex justify-between items-end border-b border-[#1b1b20] pb-8">
            <div className="space-y-3">
              <span className="editorial-caption">Digital Showroom / 02</span>
              <p className="text-xs tracking-[0.25em] text-[#8e9096] uppercase font-mono">VÉRION ONE</p>
              <h1 className="editorial-headline text-5xl sm:text-7xl md:text-8xl text-[#f5f4f0] font-light">
                FORM FOLLOWS<br />
                FEELING.
              </h1>
            </div>

            <div className="hidden md:block text-right space-y-1 font-mono">
              <div className="text-[10px] tracking-[0.25em] text-[#696972] uppercase">
                Specification Standard
              </div>
              <div className="text-xs tracking-[0.2em] text-[#c4c4cb]">
                41MM × 9.8MM ARCHITECTURE
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. MASTER INTERACTIVE 3D STAGE WITH MINIMAL ANNOTATIONS */}
      <section className="relative w-full h-[78vh] sm:h-[86vh] overflow-hidden bg-[#0a0a0d] border-b border-[#1a1a1f]">
        {/* Central 3D Canvas */}
        <div
          className="absolute inset-0 z-10"
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

        {/* Editorial Minimal Annotations with Delicate Thin Leader Lines */}
        <div className="relative z-20 w-full h-full max-w-7xl mx-auto pointer-events-none p-6 sm:p-12">
          {annotations.map((anno) => (
            <div
              key={anno.id}
              className={`absolute ${anno.positionClasses} pointer-events-auto max-w-xs transition-opacity duration-300 ${
                activeAnnotation && activeAnnotation !== anno.id ? 'opacity-40' : 'opacity-100'
              }`}
              onMouseEnter={() => {
                setActiveAnnotation(anno.id);
                onCursorChange('pointer');
              }}
              onMouseLeave={() => {
                setActiveAnnotation(null);
                onCursorChange('default');
              }}
            >
              <div className="space-y-2 bg-[#08080a]/80 backdrop-blur-xs p-4 border-l border-[#f5f4f0]/25">
                <div className="flex items-center space-x-3 font-mono">
                  <span className="text-[11px] tracking-[0.25em] font-semibold text-[#f5f4f0]">
                    {anno.title}
                  </span>
                  <span className="text-[9px] tracking-[0.2em] text-[#787882]">
                    {anno.subtitle}
                  </span>
                </div>
                <p className="text-xs text-[#a0a0aa] leading-relaxed font-light">
                  {anno.description}
                </p>
              </div>
            </div>
          ))}

          {/* Interaction Helper Notice */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center pointer-events-none">
            <span className="text-[10px] tracking-[0.3em] uppercase text-[#61616a] font-mono bg-[#08080a]/60 px-3 py-1 border border-[#1a1a20]">
              360° DRAG TO ROTATE · MOUSE CONTROLS STUDIO LIGHT
            </span>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL ARCHITECTURE SPEC SHEET (Editorial, clean layout) */}
      <section className="py-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 sm:gap-16">
            <div className="md:col-span-4 space-y-4">
              <span className="editorial-caption">Technical Ledger</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#f5f4f0] font-light">
                ENGINEERING DETAILS
              </h3>
              <p className="text-xs text-[#8f8f98] leading-relaxed font-light">
                Every curve of the chassis was simulated over 2,000 hours in fluid pressure and acoustic testing chambers.
              </p>
              <div className="pt-4">
                <button
                  onClick={() => onNavigate('craft')}
                  onMouseEnter={() => onCursorChange('pointer')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="text-xs tracking-[0.2em] uppercase text-[#f5f4f0] border-b border-[#f5f4f0] pb-1 hover:opacity-75 transition-opacity"
                >
                  Inspect The Manufacturing Process →
                </button>
              </div>
            </div>

            <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-10 gap-x-12 border-t border-[#1a1a1f] pt-8">
              <div className="space-y-2">
                <div className="text-[10px] tracking-[0.25em] text-[#717179] uppercase font-mono">Chassis</div>
                <div className="font-serif text-xl text-[#f5f4f0]">Grade 5 Aerospace Titanium</div>
                <p className="text-xs text-[#8e8e96] leading-relaxed font-light">
                  41mm diameter, 9.8mm total thickness, 5-micron tolerances.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] tracking-[0.25em] text-[#717179] uppercase font-mono">Optics</div>
                <div className="font-serif text-xl text-[#f5f4f0]">Crystalline Sapphire Lens</div>
                <p className="text-xs text-[#8e8e96] leading-relaxed font-light">
                  9 Mohs scale hardness, dual curved radius with anti-glare vapor coating.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] tracking-[0.25em] text-[#717179] uppercase font-mono">Actuator</div>
                <div className="font-serif text-xl text-[#f5f4f0]">Tactile Knurled Crown</div>
                <p className="text-xs text-[#8e8e96] leading-relaxed font-light">
                  Fluted 32-tooth tactile rotary actuator with sub-millimeter detent stops.
                </p>
              </div>

              <div className="space-y-2">
                <div className="text-[10px] tracking-[0.25em] text-[#717179] uppercase font-mono">Resistance</div>
                <div className="font-serif text-xl text-[#f5f4f0]">10 ATM (100 Meters)</div>
                <p className="text-xs text-[#8e8e96] leading-relaxed font-light">
                  Hermetically sealed dual O-ring ceramic gaskets for extreme depth resistance.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. SHOWROOM CALL TO ACTION */}
      <section className="py-24 border-t border-[#16161a] text-center space-y-6">
        <ScrollReveal direction="up" delay={0.1}>
          <div className="space-y-4">
            <p className="editorial-caption">Next Step</p>
            <h3 className="font-serif text-4xl sm:text-5xl text-[#f5f4f0] font-light">
              ACQUIRE THE SPECIMEN
            </h3>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('shop')}
                onMouseEnter={() => onCursorChange('pointer')}
                onMouseLeave={() => onCursorChange('default')}
                className="px-8 py-3.5 bg-[#f5f4f0] text-[#08080a] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#dedcd5] transition-colors focus:outline-hidden"
              >
                Open Configurator
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
