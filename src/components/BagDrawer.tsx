import React, { useState } from 'react';
import { BagItem, PageId } from '../types';
import { X, Check } from 'lucide-react';

interface BagDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BagItem[];
  onRemoveItem: (id: string) => void;
  onNavigate: (page: PageId) => void;
}

export const BagDrawer: React.FC<BagDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onNavigate,
}) => {
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const totalAmount = items.reduce(
    (sum, item) => sum + item.config.price * item.quantity,
    0
  );

  const formatRupee = (amt: number) => {
    return '₹' + amt.toLocaleString('en-IN');
  };

  const handleCheckout = () => {
    setOrderComplete(true);
    setTimeout(() => {
      setOrderComplete(false);
      onClose();
    }, 3200);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-[#000000]/70 backdrop-blur-xs transition-opacity duration-500"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        id="bag-drawer-panel"
        className="relative w-full max-w-md bg-[#0d0d10] border-l border-[#242429] h-full flex flex-col justify-between p-8 sm:p-10 shadow-2xl z-10 animate-in slide-in-from-right duration-500"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#1f1f24]">
          <div className="space-y-1">
            <span className="editorial-caption">Cart / Reserved Allocation</span>
            <h3 className="font-serif text-2xl text-[#f5f4f0] font-light">YOUR SELECTION</h3>
          </div>
          <button
            id="close-bag-btn"
            onClick={onClose}
            className="text-[#8c8c94] hover:text-[#f5f4f0] transition-colors p-2 focus:outline-hidden"
            aria-label="Close bag"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto py-6 space-y-6">
          {orderComplete ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-12 h-12 rounded-full border border-[#f5f4f0]/30 mx-auto flex items-center justify-center text-[#f5f4f0]">
                <Check size={20} />
              </div>
              <h4 className="font-serif text-2xl text-[#f5f4f0]">ALLOCATION SECURED</h4>
              <p className="text-xs text-[#8c8c94] max-w-xs mx-auto leading-relaxed">
                Your bespoke VÉRION ONE reservation has been confirmed. Our personal concierge will contact you within 2 hours.
              </p>
              <div className="pt-2 text-[10px] tracking-[0.25em] text-[#63636b] uppercase">
                Order Ref: VRN-2026-094
              </div>
            </div>
          ) : items.length === 0 ? (
            <div className="py-20 text-center space-y-4">
              <p className="text-sm text-[#8c8c94]">Your allocation bag is currently empty.</p>
              <button
                onClick={() => {
                  onClose();
                  onNavigate('shop');
                }}
                className="text-xs tracking-[0.2em] uppercase text-[#f5f4f0] border-b border-[#f5f4f0] pb-1 hover:opacity-75 transition-opacity"
              >
                Configure VÉRION ONE →
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="border border-[#1f1f24] p-5 bg-[#09090b]/60 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-serif text-lg text-[#f5f4f0] tracking-wide">
                        {item.name}
                      </h4>
                      <p className="text-[11px] text-[#8c8c94] uppercase tracking-wider mt-0.5">
                        {item.config.caseMaterial} Case · {item.config.finish} · {item.config.strap} Strap
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[10px] uppercase tracking-widest text-[#686870] hover:text-[#f5f4f0] transition-colors"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-[#1a1a1f] text-xs">
                    <span className="text-[#8c8c94]">Qty: {item.quantity}</span>
                    <span className="text-[#f5f4f0] font-medium tracking-wide">
                      {formatRupee(item.config.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!orderComplete && items.length > 0 && (
          <div className="border-t border-[#1f1f24] pt-6 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs tracking-[0.2em] uppercase text-[#8c8c94]">Subtotal</span>
              <span className="font-serif text-xl text-[#f5f4f0] tracking-wide">
                {formatRupee(totalAmount)}
              </span>
            </div>

            <p className="text-[10px] text-[#6f7078] leading-relaxed">
              Includes complimentary insured priority transport, presentation box, and 5-year international craftsmanship warranty.
            </p>

            <button
              id="concierge-checkout-btn"
              onClick={handleCheckout}
              className="w-full py-4 bg-[#f5f4f0] text-[#08080a] text-xs uppercase tracking-[0.25em] font-medium hover:bg-[#e4e2db] transition-colors focus:outline-hidden"
            >
              Confirm Reservation
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
