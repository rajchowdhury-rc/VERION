import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  bagCount: number;
  onOpenBag: () => void;
  onCursorChange: (type: 'default' | 'pointer' | 'rotate' | 'view') => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  bagCount,
  onOpenBag,
  onCursorChange,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavHidden, setIsNavHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 40);

      // Disappear or become quiet when deeply scrolling down, reappear on scroll up
      if (currentScrollY > 200 && currentScrollY > lastScrollY + 5) {
        setIsNavHidden(true);
      } else if (currentScrollY < lastScrollY - 5 || currentScrollY <= 80) {
        setIsNavHidden(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems: { id: PageId; label: string }[] = [
    { id: 'product', label: 'PRODUCT' },
    { id: 'craft', label: 'CRAFT' },
    { id: 'experience', label: 'EXPERIENCE' },
    { id: 'shop', label: 'SHOP' },
  ];

  const handleLinkClick = (page: PageId) => {
    setIsMobileMenuOpen(false);
    onNavigate(page);
  };

  return (
    <>
      <header
        id="verion-header"
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-out ${
          isNavHidden ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
        } ${
          isScrolled
            ? 'py-4 bg-[#08080a]/80 backdrop-blur-md border-b border-[#222226]/50'
            : 'py-7 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Brand Wordmark */}
          <button
            id="brand-logo"
            onClick={() => handleLinkClick('home')}
            onMouseEnter={() => onCursorChange('pointer')}
            onMouseLeave={() => onCursorChange('default')}
            className="group text-left focus:outline-hidden"
          >
            <span className="font-serif tracking-[0.2em] text-xl sm:text-2xl font-light text-[#f5f4f0] transition-opacity duration-300 group-hover:opacity-75">
              VÉRION
            </span>
          </button>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center space-x-10 text-[11px] tracking-[0.24em] font-medium text-[#9a9aa2]">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                onMouseEnter={() => onCursorChange('pointer')}
                onMouseLeave={() => onCursorChange('default')}
                className={`relative py-1 transition-colors duration-300 hover:text-[#f5f4f0] focus:outline-hidden ${
                  currentPage === item.id ? 'text-[#f5f4f0]' : ''
                }`}
              >
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute bottom-0 left-0 w-full h-px bg-[#f5f4f0] transform origin-left transition-transform duration-300" />
                )}
              </button>
            ))}

            {/* Bag Button */}
            <button
              id="nav-bag-button"
              onClick={onOpenBag}
              onMouseEnter={() => onCursorChange('pointer')}
              onMouseLeave={() => onCursorChange('default')}
              className="group flex items-center space-x-2 py-1 text-[#f5f4f0] transition-opacity duration-300 hover:opacity-80 focus:outline-hidden"
            >
              <span>BAG</span>
              <span className="text-[9px] px-1.5 py-0.5 rounded-full border border-[#38383f] text-[#8e9096] group-hover:border-[#f5f4f0] group-hover:text-[#f5f4f0] transition-colors duration-300">
                {bagCount}
              </span>
            </button>
          </nav>

          {/* Mobile Right Controls */}
          <div className="flex items-center space-x-5 md:hidden">
            <button
              id="mobile-bag-btn"
              onClick={onOpenBag}
              className="text-[11px] tracking-[0.2em] text-[#f5f4f0] flex items-center space-x-1"
            >
              <span>BAG</span>
              <span className="text-[10px] text-[#8c8c94]">({bagCount})</span>
            </button>

            <button
              id="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-[#f5f4f0] p-1.5 focus:outline-hidden"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-overlay"
          className="fixed inset-0 z-35 bg-[#08080a] flex flex-col justify-between px-8 py-24 md:hidden animate-fade-in"
        >
          <div className="space-y-8">
            <span className="editorial-caption">Navigation / Flagship</span>
            <div className="flex flex-col space-y-6 pt-4">
              <button
                onClick={() => handleLinkClick('home')}
                className="text-left font-serif text-3xl text-[#f5f4f0] tracking-wider"
              >
                00 / INDEX
              </button>
              {navItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => handleLinkClick(item.id)}
                  className={`text-left font-serif text-3xl tracking-wider ${
                    currentPage === item.id ? 'text-[#f5f4f0]' : 'text-[#6e6e76]'
                  }`}
                >
                  0{idx + 1} / {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className="border-t border-[#1e1e22] pt-8 space-y-2 text-[10px] tracking-[0.2em] text-[#71717a]">
            <div>VÉRION ONE — 2026 EDITION</div>
            <div>ENGINEERED TO BE DESIRED</div>
          </div>
        </div>
      )}
    </>
  );
};
