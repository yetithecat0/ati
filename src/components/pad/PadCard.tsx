'use client';

import React, { useState } from 'react';
import { STATUS_COLORS } from '../../lib/constants';
import { usePadStore } from '../../store/usePadStore';
import { PadStatus } from '../../types/ati';

interface PadCardProps {
  id: string;
  name: string;
  url: string;
  color: string;
  status: PadStatus;
  rating?: number;
  isOpen?: boolean;
  isGhost?: boolean;
  onHover?: (id: string, x: number, y: number) => void;
  onHoverLeave?: () => void;
  onClick?: () => void;
  onEditClick?: (id: string) => void;
}

export function PadCard({ id, name, url, color, status, rating, isOpen, isGhost, onHover, onHoverLeave, onClick, onEditClick }: PadCardProps) {
  const [imgError, setImgError] = useState(false);
  
  const { mode, deletePad } = usePadStore();

  const getDomain = (url: string) => {
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const domain = getDomain(url);
  const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;
  
  const initials = name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase();

  const handlePadClick = (e: React.MouseEvent) => {
    if (mode === 'edit') {
      e.preventDefault();
      if (onEditClick) onEditClick(id);
    } else {
      if (onClick) onClick();
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (confirm(`¿Eliminar de forma permanente el pad '${name}'?`)) {
      deletePad(id);
    }
  };

  const glowColor = `${color}80`;
  const hoverGlowColor = `${color}BF`;

  return (
    <button
      onClick={handlePadClick}
      className={`
        relative w-[88px] h-[88px] shrink-0 rounded-[14px] p-2 flex flex-col items-center justify-between
        transition-all duration-150 group shrink-0 box-border
        ${isGhost ? 'opacity-20 grayscale pointer-events-none' : ''}
        ${mode === 'launch' 
          ? 'cursor-pointer border-x border-t hover:scale-[1.02] active:translate-y-[3px] active:border-b-[1px]' 
          : 'border-2 border-dashed border-divider/60 cursor-pointer hover:bg-elevated/40'}
      `}
      style={{ 
        backgroundColor: 'var(--elevated)', 
        borderColor: !isGhost && mode === 'launch' ? `${color}88` : undefined,
        borderBottomWidth: !isGhost && mode === 'launch' ? '5px' : undefined,
        borderBottomColor: !isGhost && mode === 'launch' ? `${color}AA` : undefined,
        boxShadow: !isGhost && mode === 'launch' 
          ? `inset 0 1px 1px rgba(255,255,255,0.1), 0 0 25px -5px ${glowColor}` 
          : 'none',
      } as React.CSSProperties}
      onMouseEnter={(e) => {
        if (!isGhost && mode === 'launch') {
          e.currentTarget.style.boxShadow = `inset 0 1px 2px rgba(255,255,255,0.2), 0 0 35px -2px ${hoverGlowColor}`;
          e.currentTarget.style.filter = 'brightness(1.1)';
          if (onHover) onHover(id, e.clientX, e.clientY);
        }
      }}
      onMouseLeave={(e) => {
        if (!isGhost && mode === 'launch') {
          e.currentTarget.style.boxShadow = `inset 0 1px 1px rgba(255,255,255,0.1), 0 0 25px -5px ${glowColor}`;
          e.currentTarget.style.filter = 'none';
          if (onHoverLeave) onHoverLeave();
        }
      }}
      onMouseMove={(e) => {
        if (!isGhost && mode === 'launch' && onHover) {
          onHover(id, e.clientX, e.clientY);
        }
      }}
      title={mode === 'edit' ? (isGhost ? 'Marca de agua (Reutiliza con click sostenido en +)' : 'Haz clic para editar parámetros del Pad') : undefined}
    >
      {mode === 'edit' && (
        <div 
          onClick={handleDelete}
          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-base border border-divider text-red-500 hover:text-white hover:bg-red-600 flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all z-20 cursor-pointer"
          title="Eliminar rápidamente"
        >
          <span className="material-symbols-outlined text-[14px] font-bold">close</span>
        </div>
      )}

      {mode === 'launch' && isOpen && (
        <div className="absolute top-1.5 left-1.5 bg-white/20 rounded-[6px] text-[8px] px-1.5 py-[1px] text-white font-semibold shadow-sm backdrop-blur-sm pointer-events-none">
          live
        </div>
      )}

      {/* Contenedor Superior: Icono */}
      <div className="flex-1 flex items-center justify-center mt-1">
        <div 
          className={`w-[32px] h-[32px] rounded-[9px] flex items-center justify-center overflow-hidden shrink-0 shadow-inner transition-transform relative pointer-events-none ${mode === 'launch' && 'group-hover:scale-110'}`}
          style={{ backgroundColor: color }}
        >
          <span className="text-white text-[12px] font-bold font-headline absolute inset-0 flex items-center justify-center z-0">
            {initials}
          </span>
          <img 
            src={logoUrl} 
            alt={`${name} logo`} 
            className={`w-full h-full object-cover relative z-10 transition-opacity duration-200 ${imgError ? 'opacity-0' : 'opacity-100'}`}
            onError={() => setImgError(true)}
          />
        </div>
      </div>

      {/* Contenedor Inferior: Nombre y Estrellas */}
      <div className="flex flex-col items-center w-full mb-0.5 pointer-events-none">
        <span className="text-[10px] font-medium text-white text-center leading-tight truncate w-full px-1">
          {name}
        </span>

        {/* Estrellas: Solo si > 0 */}
        <div className="h-[10px] flex items-center justify-center mt-0.5">
          {Boolean(mode === 'launch' && rating && rating > 0) && (
            <div className="flex items-center justify-center gap-0.5 opacity-90">
              {Array.from({ length: Math.min(rating || 0, 5) }).map((_, i) => (
                <span 
                  key={i} 
                  className="material-symbols-outlined !leading-none select-none"
                  style={{ 
                    fontSize: '8px', 
                    width: '8px', 
                    height: '8px',
                    fontVariationSettings: '"FILL" 1, "wght" 700',
                    color: '#EF9F27'
                  }}
                >
                  grade
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {status !== 'none' && mode === 'launch' && (
        <div 
          className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full pointer-events-none border border-white/20 shadow-sm"
          style={{ 
            backgroundColor: STATUS_COLORS[status] || '#378ADD', 
            boxShadow: `0 0 8px ${(STATUS_COLORS[status] || '#378ADD')}66`
          }}
        />
      )}
    </button>
  );
}
