import React, { useState, useEffect } from 'react';
import { PageId, ProductConfiguration, BagItem } from './types';
import { Navigation } from './components/Navigation';
import { CustomCursor, CursorType } from './components/CustomCursor';
import { PageTransition } from './components/PageTransition';
import { BagDrawer } from './components/BagDrawer';

import { HomePage } from './pages/HomePage';
import { ProductPage } from './pages/ProductPage';
import { CraftPage } from './pages/CraftPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ShopPage } from './pages/ShopPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [isBagOpen, setIsBagOpen] = useState(false);

  // Bag State
  const [bagItems, setBagItems] = useState<BagItem[]>([
    {
      id: 'default-vrn-1',
      name: 'VÉRION ONE',
      config: {
        caseMaterial: 'titanium',
        finish: 'brushed',
        strap: 'graphite',
        price: 129000,
      },
      quantity: 1,
      addedAt: Date.now(),
    },
  ]);

  // Sync with browser hash if present
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#/', '').replace('#', '') as PageId;
      if (['home', 'product', 'craft', 'experience', 'shop'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (targetPage: PageId) => {
    if (targetPage === currentPage) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Start cinematic black transition (~700ms)
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(targetPage);
      window.location.hash = targetPage === 'home' ? '' : `#${targetPage}`;
      window.scrollTo({ top: 0, behavior: 'instant' });
      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }, 350);
  };

  const handleAddToBag = (config: ProductConfiguration) => {
    const newItem: BagItem = {
      id: `vrn-${Date.now()}`,
      name: 'VÉRION ONE',
      config,
      quantity: 1,
      addedAt: Date.now(),
    };
    setBagItems((prev) => [newItem, ...prev]);
    setIsBagOpen(true);
  };

  const handleRemoveFromBag = (id: string) => {
    setBagItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="relative min-h-screen bg-[#08080a] text-[#f5f4f0] antialiased selection:bg-[#f5f4f0] selection:text-[#08080a]">
      {/* Custom Refined Cursor (Desktop only, responsive to canvas and imagery) */}
      <CustomCursor cursorType={cursorType} />

      {/* Cinematic Transition Curtain */}
      <PageTransition isTransitioning={isTransitioning} />

      {/* Flagship Minimalist Header */}
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        bagCount={bagItems.reduce((acc, item) => acc + item.quantity, 0)}
        onOpenBag={() => setIsBagOpen(true)}
        onCursorChange={setCursorType}
      />

      {/* Active Page View */}
      <main className="w-full">
        {currentPage === 'home' && (
          <HomePage onNavigate={handleNavigate} onCursorChange={setCursorType} />
        )}
        {currentPage === 'product' && (
          <ProductPage onNavigate={handleNavigate} onCursorChange={setCursorType} />
        )}
        {currentPage === 'craft' && (
          <CraftPage onNavigate={handleNavigate} onCursorChange={setCursorType} />
        )}
        {currentPage === 'experience' && (
          <ExperiencePage onNavigate={handleNavigate} onCursorChange={setCursorType} />
        )}
        {currentPage === 'shop' && (
          <ShopPage onAddToBag={handleAddToBag} onCursorChange={setCursorType} />
        )}
      </main>

      {/* Minimal Luxury Bag Flyout / Reservation Drawer */}
      <BagDrawer
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        items={bagItems}
        onRemoveItem={handleRemoveFromBag}
        onNavigate={handleNavigate}
      />
    </div>
  );
}
