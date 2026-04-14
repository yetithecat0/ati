'use client';

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface AtiSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AtiSheet({ isOpen, onClose, title, children, footer }: AtiSheetProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure we're in the browser before using document
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) setShouldRender(true);
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) setShouldRender(false);
  };

  if (!shouldRender || !mounted) return null;

  // CRITICAL FIX: Use a React Portal to render directly to document.body,
  // escaping any parent stacking contexts (e.g. sticky/fixed sidebars)
  // that would corrupt z-index layering and make the modal appear transparent.
  return ReactDOM.createPortal(
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[9998] bg-black/70 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Sheet Container - Floating Centered Card */}
      <div
        className="fixed inset-0 z-[9999] flex items-center justify-center p-8 pointer-events-none"
        onTransitionEnd={handleAnimationEnd}
      >
        <div
          className={`
            w-full max-w-4xl max-h-[85vh]
            bg-elevated
            border border-ati-purple/30
            rounded-3xl
            shadow-[0_20px_100px_rgba(0,0,0,0.8)]
            pointer-events-auto
            transition-all duration-500 ease-out
            flex flex-col
            ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}
          `}
        >
          {/* Header */}
          <div className="flex justify-between items-center px-10 py-6 border-b border-divider/20 shrink-0">
            <h2 className="text-lg font-bold font-headline text-hi tracking-widest uppercase">{title}</h2>
            <button
              onClick={onClose}
              type="button"
              className="w-8 h-8 rounded-full bg-base border border-divider flex items-center justify-center text-lo hover:text-hi transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-10 pt-6 custom-scrollbar">
            {children}
          </div>

          {/* Footer (optional) */}
          {footer && (
            <div className="shrink-0 w-full px-10 py-6 border-t border-divider/20 flex items-center">
              {footer}
            </div>
          )}
        </div>
      </div>
    </>,
    document.body
  );
}
