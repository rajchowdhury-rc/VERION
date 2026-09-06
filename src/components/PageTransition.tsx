import React, { useEffect, useState } from 'react';

interface PageTransitionProps {
  isTransitioning: boolean;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ isTransitioning }) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (isTransitioning) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 700);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  if (!shouldRender) return null;

  return (
    <div
      id="cinematic-transition-curtain"
      className={`fixed inset-0 z-50 bg-[#08080a] pointer-events-none transition-opacity duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isTransitioning ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-serif text-sm tracking-[0.3em] text-[#6b6b72] uppercase select-none transition-opacity duration-300">
          VÉRION
        </span>
      </div>
    </div>
  );
};
