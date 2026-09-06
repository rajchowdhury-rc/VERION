import React, { useState } from 'react';
import { CaseOption, FinishOption, StrapOption, ProductConfiguration } from '../types';
import { VerionCanvas } from '../components/VerionCanvas';
import { ScrollReveal } from '../components/ScrollReveal';
import { Check, ArrowRight, Sparkles } from 'lucide-react';

interface ShopPageProps {
  onAddToBag: (config: ProductConfiguration) => void;
  onCursorChange: (type: 'default' | 'pointer' | 'rotate' | 'view') => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ onAddToBag, onCursorChange }) => {
  // Configurator state
  const [selectedCase, setSelectedCase] = useState<CaseOption>('titanium');
  const [selectedFinish, setSelectedFinish] = useState<FinishOption>('brushed');
  const [selectedStrap, setSelectedStrap] = useState<StrapOption>('graphite');
  const [activeTab, setActiveTab] = useState<'collection' | 'configurator'>('collection');
  const [addedSuccess, setAddedSuccess] = useState(false);

  const price = 129000;

  const collectionItems: {
    id: string;
    caseMat: CaseOption;
    finish: FinishOption;
    strap: StrapOption;
    name: string;
    tagline: string;
    description: string;
    priceStr: string;
    imageUrl: string;
    spec: string;
  }[] = [
    {
      id: 'titanium',
      caseMat: 'titanium',
      finish: 'brushed',
      strap: 'graphite',
      name: 'ONE / TITANIUM',
      tagline: 'AEROSPACE MONOLITH',
      description: 'Grade 5 brushed titanium chassis with crystalline sapphire lens and graphite vulcanized fluoroelastomer band.',
      priceStr: '₹1,29,000',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop',
      spec: 'Grade 5 Ti · 58g · 10 ATM',
    },
    {
      id: 'ceramic',
      caseMat: 'ceramic',
      finish: 'polished',
      strap: 'ivory',
      name: 'ONE / CERAMIC',
      tagline: 'ZIRCONIUM LUSTER',
      description: 'Ultra-dense white zirconium dioxide ceramic bezel with mirror chamfers and warm ivory strap.',
      priceStr: '₹1,29,000',
      imageUrl: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?q=80&w=1200&auto=format&fit=crop',
      spec: 'ZrO2 Ceramic · Mirror Bezel · Ivory',
    },
    {
      id: 'obsidian',
      caseMat: 'obsidian',
      finish: 'matte',
      strap: 'carbon',
      name: 'ONE / OBSIDIAN',
      tagline: 'TOTAL ABSORPTION',
      description: 'Diamond-like carbon (DLC) obsidian coated titanium unibody with deep matte carbon weave band.',
      priceStr: '₹1,29,000',
      imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1200&auto=format&fit=crop',
      spec: 'Diamond-Like Carbon · Matte Stealth',
    },
  ];

  const handleSelectFromCollection = (item: typeof collectionItems[0]) => {
    setSelectedCase(item.caseMat);
    setSelectedFinish(item.finish);
    setSelectedStrap(item.strap);
    setActiveTab('configurator');
  };

  const handleAddCurrentToBag = () => {
    onAddToBag({
      caseMaterial: selectedCase,
      finish: selectedFinish,
      strap: selectedStrap,
      price: price,
    });
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2400);
  };

  return (
    <div className="w-full bg-[#08080a] text-[#f5f4f0] pt-24 sm:pt-28 min-h-screen">
      {/* 1. SECTION TOGGLE BAR */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pt-6 pb-8 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-[#1a1a1f]">
        <div>
          <span className="editorial-caption">Flagship Boutique / 05</span>
          <h1 className="editorial-headline text-4xl sm:text-6xl text-[#f5f4f0] font-light mt-1">
            {activeTab === 'collection' ? 'THE COLLECTION' : 'BESPOKE ATELIER'}
          </h1>
        </div>

        <div className="flex space-x-6 text-[11px] tracking-[0.25em] uppercase font-medium">
          <button
            id="tab-collection"
            onClick={() => setActiveTab('collection')}
            onMouseEnter={() => onCursorChange('pointer')}
            onMouseLeave={() => onCursorChange('default')}
            className={`pb-1 border-b transition-colors ${
              activeTab === 'collection'
                ? 'border-[#f5f4f0] text-[#f5f4f0]'
                : 'border-transparent text-[#6e6e76] hover:text-[#f5f4f0]'
            }`}
          >
            Curated Editions
          </button>
          <button
            id="tab-configurator"
            onClick={() => setActiveTab('configurator')}
            onMouseEnter={() => onCursorChange('pointer')}
            onMouseLeave={() => onCursorChange('default')}
            className={`pb-1 border-b transition-colors ${
              activeTab === 'configurator'
                ? 'border-[#f5f4f0] text-[#f5f4f0]'
                : 'border-transparent text-[#6e6e76] hover:text-[#f5f4f0]'
            }`}
          >
            Custom Configurator
          </button>
        </div>
      </div>

      {/* 2. CURATED COLLECTION VIEW */}
      {activeTab === 'collection' && (
        <section className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-16 space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-8">
            {collectionItems.map((item, index) => (
              <ScrollReveal
                key={item.id}
                delay={index * 0.15}
                direction="up"
                className="h-full"
              >
                <div
                  id={`collection-card-${item.id}`}
                  onClick={() => handleSelectFromCollection(item)}
                  onMouseEnter={() => onCursorChange('pointer')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="group cursor-pointer h-full flex flex-col justify-between border border-[#1a1a20] bg-[#0c0c0f] hover:border-[#383842] transition-colors duration-400 p-6 sm:p-7 space-y-7"
                >
                  {/* Studio Photographic Visual Area (No lag, crisp assets) */}
                  <div className="relative w-full h-[320px] sm:h-[360px] overflow-hidden bg-[#070709] border border-[#16161b]">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover object-center filter contrast-115 brightness-90 transition-opacity duration-300 group-hover:brightness-100"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 text-[9px] tracking-[0.25em] text-[#a0a0aa] bg-[#08080a]/80 backdrop-blur-xs px-2.5 py-1 border border-[#22222a] uppercase font-mono">
                      {item.tagline}
                    </div>
                    <div className="absolute bottom-4 right-4 bg-[#08080a]/90 backdrop-blur-xs px-3 py-1.5 border border-[#33333d] text-[10px] tracking-[0.2em] text-[#f5f4f0] uppercase flex items-center space-x-1.5">
                      <span>Inspect in 3D</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="space-y-3">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-serif text-2xl text-[#f5f4f0] font-light tracking-wide">
                        {item.name}
                      </h3>
                      <span className="font-mono text-base text-[#d0d0d8]">
                        {item.priceStr}
                      </span>
                    </div>
                    <p className="text-xs text-[#8c8c94] leading-relaxed font-light">
                      {item.description}
                    </p>
                    <div className="text-[10px] font-mono tracking-wider text-[#696975] pt-1">
                      {item.spec}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1a1a20] flex justify-between items-center text-[10px] tracking-[0.2em] text-[#6e6e78] uppercase">
                    <span>Allocated for Dispatch</span>
                    <span className="text-[#f5f4f0] group-hover:text-white font-medium flex items-center space-x-1">
                      <span>Configure</span>
                      <span>→</span>
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.2} direction="up">
            <div className="border border-[#1a1a20] bg-[#0b0b0e] p-8 sm:p-10 text-center space-y-4">
              <div className="inline-flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase text-[#888894] font-mono">
                <Sparkles size={13} className="text-[#d8d8e0]" />
                <span>Bespoke Atelier Commission</span>
              </div>
              <h4 className="font-serif text-2xl sm:text-3xl text-[#f5f4f0] font-light">
                Tailor Your Individual Specimen
              </h4>
              <p className="text-xs text-[#8c8c94] max-w-lg mx-auto leading-relaxed">
                Assemble titanium or zirconium bezels with bespoke surface finishing and hand-matched straps.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => setActiveTab('configurator')}
                  className="px-6 py-3 bg-[#18181e] hover:bg-[#22222a] text-[#f5f4f0] border border-[#2a2a34] text-xs tracking-[0.25em] uppercase transition-colors"
                >
                  Launch 3D Configurator →
                </button>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* 3. SOPHISTICATED FULL-SCREEN PRODUCT CONFIGURATOR */}
      {activeTab === 'configurator' && (
        <section className="relative w-full min-h-[82vh] max-w-7xl mx-auto px-6 sm:px-12 md:px-20 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Single high-performance 60fps 3D studio (responsive to live material choices) */}
            <div className="lg:col-span-7 h-[460px] sm:h-[620px] relative bg-[#0b0b0d] border border-[#1b1b20]">
              <div
                className="w-full h-full"
                onMouseEnter={() => onCursorChange('rotate')}
                onMouseLeave={() => onCursorChange('default')}
              >
                <VerionCanvas
                  mode="configurator"
                  caseMaterial={selectedCase}
                  finish={selectedFinish}
                  strap={selectedStrap}
                  interactive={true}
                  className="w-full h-full"
                />
              </div>

              {/* Minimal 3D HUD Indicators */}
              <div className="absolute top-6 left-6 z-20 text-[10px] tracking-[0.2em] text-[#82828e] uppercase font-mono bg-[#08080a]/70 px-2.5 py-1 border border-[#1e1e24]">
                Interactive Specimen / Real-Time PBR
              </div>
              <div className="absolute bottom-6 left-6 z-20 text-[10px] tracking-[0.2em] text-[#6b6b75] uppercase pointer-events-none font-mono">
                360° Drag to Inspect
              </div>
            </div>

            {/* Right: Minimalist Luxury Configurator Panel */}
            <div className="lg:col-span-5 space-y-8 pl-0 lg:pl-6">
              <div className="space-y-2 border-b border-[#1a1a1f] pb-6">
                <span className="editorial-caption">Specification Configuration</span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#f5f4f0] font-light">
                  VÉRION ONE
                </h2>
                <div className="font-mono text-2xl text-[#f5f4f0] pt-1">
                  ₹{price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Material: CASE */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs tracking-[0.2em] uppercase">
                  <span className="text-[#8c8c94]">Case Material</span>
                  <span className="text-[#f5f4f0] font-mono capitalize">{selectedCase}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {(['titanium', 'ceramic', 'obsidian'] as CaseOption[]).map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCase(c)}
                      onMouseEnter={() => onCursorChange('pointer')}
                      onMouseLeave={() => onCursorChange('default')}
                      className={`py-3 px-2 text-xs tracking-wider uppercase border transition-all ${
                        selectedCase === c
                          ? 'border-[#f5f4f0] bg-[#1a1a1f] text-[#f5f4f0]'
                          : 'border-[#222228] text-[#81818a] hover:border-[#3c3c46]'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material: FINISH */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs tracking-[0.2em] uppercase">
                  <span className="text-[#8c8c94]">Case Finish</span>
                  <span className="text-[#f5f4f0] font-mono capitalize">{selectedFinish}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {(['brushed', 'polished', 'matte'] as FinishOption[]).map((f) => (
                    <button
                      key={f}
                      onClick={() => setSelectedFinish(f)}
                      onMouseEnter={() => onCursorChange('pointer')}
                      onMouseLeave={() => onCursorChange('default')}
                      className={`py-3 px-2 text-xs tracking-wider uppercase border transition-all ${
                        selectedFinish === f
                          ? 'border-[#f5f4f0] bg-[#1a1a1f] text-[#f5f4f0]'
                          : 'border-[#222228] text-[#81818a] hover:border-[#3c3c46]'
                      }`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material: STRAP */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-xs tracking-[0.2em] uppercase">
                  <span className="text-[#8c8c94]">Strap Band</span>
                  <span className="text-[#f5f4f0] font-mono capitalize">{selectedStrap}</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {(['graphite', 'ivory', 'carbon'] as StrapOption[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedStrap(s)}
                      onMouseEnter={() => onCursorChange('pointer')}
                      onMouseLeave={() => onCursorChange('default')}
                      className={`py-3 px-2 text-xs tracking-wider uppercase border transition-all ${
                        selectedStrap === s
                          ? 'border-[#f5f4f0] bg-[#1a1a1f] text-[#f5f4f0]'
                          : 'border-[#222228] text-[#81818a] hover:border-[#3c3c46]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add to Bag CTA */}
              <div className="pt-4 space-y-4">
                <button
                  id="configurator-add-to-bag"
                  onClick={handleAddCurrentToBag}
                  onMouseEnter={() => onCursorChange('pointer')}
                  onMouseLeave={() => onCursorChange('default')}
                  className="w-full py-4 bg-[#f5f4f0] text-[#08080a] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#dedcd5] transition-all flex items-center justify-center space-x-2 focus:outline-hidden"
                >
                  {addedSuccess ? (
                    <>
                      <Check size={16} />
                      <span>ALLOCATION ADDED</span>
                    </>
                  ) : (
                    <span>ADD TO BAG</span>
                  )}
                </button>

                <p className="text-[10px] text-[#696972] text-center tracking-wider font-mono">
                  Complimentary worldwide concierge dispatch within 48 hours.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

