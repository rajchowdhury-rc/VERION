import React, { useEffect, useState } from 'react';

export type CursorType = 'default' | 'pointer' | 'rotate' | 'view';

interface CustomCursorProps {
  cursorType: CursorType;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ cursorType }) => {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Detect touch device
    if (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);
    document.body.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      document.body.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  if (isTouchDevice || !isVisible) return null;

  const isRotate = cursorType === 'rotate';
  const isView = cursorType === 'view';
  const isPointer = cursorType === 'pointer';

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 z-50 transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      {/* Central dot */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ease-out ${
          isRotate || isView
            ? 'w-16 h-16 border border-[#f5f4f0]/40 bg-[#08080a]/60 backdrop-blur-xs flex items-center justify-center'
            : isPointer
            ? 'w-9 h-9 border border-[#f5f4f0]/60 bg-transparent'
            : 'w-1.5 h-1.5 bg-[#f5f4f0]'
        }`}
      >
        {isRotate && (
          <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-[#f5f4f0] select-none">
            Rotate
          </span>
        )}
        {isView && (
          <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-[#f5f4f0] select-none">
            View
          </span>
        )}
      </div>
    </div>
  );
};
