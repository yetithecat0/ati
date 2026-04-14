import React, { useState, useEffect } from 'react';
import { Pad } from '../../types/ati';

interface PadInfoCardProps {
  pad: Pad | undefined;
  mousePos: { x: number, y: number };
}

export function PadInfoCard({ pad, mousePos }: PadInfoCardProps) {
  const [coords, setCoords] = useState({ left: 0, top: 0, side: 'right' });
  const cardWidth = 560;
  const cardHeight = 450; 

  useEffect(() => {
    let left = mousePos.x + 40;
    let top = mousePos.y - 150;
    let side = 'right';

    // Anti-colisión Derecha (Flip lateral)
    if (left + cardWidth > window.innerWidth - 20) {
      left = mousePos.x - cardWidth - 40;
      side = 'left';
    }

    // Anti-colisión Inferior (Clamping vertical)
    if (top + cardHeight > window.innerHeight - 20) {
      top = window.innerHeight - cardHeight - 20;
    }

    // Anti-colisión Superior
    if (top < 20) top = 20;

    setCoords({ left, top, side });
  }, [mousePos]);

  if (!pad) return null;

  const getDomain = (url: string) => {
    if (!url) return 'url-no-definida';
    try {
      return new URL(url).hostname;
    } catch {
      return url;
    }
  };

  const domain = getDomain(pad.url);
  const logoUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=128`;

  const statusMap: Record<string, { label: string, color: string }> = {
    por_probar: { label: 'Por probar', color: '#378ADD' },
    en_uso: { label: 'En uso', color: '#EF9F27' },
    recomendada: { label: 'Recomendada', color: '#639922' },
    none: { label: 'Sin estado', color: '#64748B' }
  };

  // Fallback seguro si el status no existe en el mapa
  const currentStatus = statusMap[pad.status as string] || statusMap.none;

  if (coords.left === 0) return null; // Esperar al primer cálculo

  return (
    <div 
      className={`fixed z-[1000] pointer-events-none animate-in fade-in zoom-in duration-300 ${
        coords.side === 'right' ? 'slide-in-from-left-4' : 'slide-in-from-right-4'
      }`}
      style={{ 
        left: `${coords.left}px`, 
        top: `${coords.top}px`,
        width: `${cardWidth}px`
      }}
    >
      <div className="bg-[#16161a] rounded-[28px] shadow-[0_32px_80px_-16px_rgba(0,0,0,0.8)] overflow-hidden flex border border-[#2a2a2e]/60 backdrop-blur-2xl">
        {/* Left Side: Visual Accent */}
        <div className="w-52 bg-[#1b1b1d] p-8 flex flex-col items-center justify-center gap-8 border-r border-[#2a2a2e]/30">
          {/* Mechanical Pad Mockup */}
          <div 
            className="w-[96px] h-[96px] rounded-[18px] flex items-center justify-center relative transition-transform"
            style={{ 
              backgroundColor: '#1E293B',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              borderBottom: `6px solid ${pad.color}CC`,
              boxShadow: `
                inset 0 1px 1px rgba(255,255,255,0.1), 
                0 0 40px -10px ${pad.color}44,
                0 10px 20px -5px rgba(0,0,0,0.5)
              `
            }}
          >
            <div className="relative z-10 w-12 h-12 bg-surface/40 rounded-xl flex items-center justify-center shadow-inner">
              <img src={logoUrl} alt="" className="w-9 h-9 object-contain" />
            </div>
            {/* Glow Aura */}
            <div 
              className="absolute inset-x-0 -bottom-4 h-8 blur-2xl opacity-40 pointer-events-none"
              style={{ backgroundColor: pad.color }}
            />
          </div>
          
          <div className="flex flex-col items-center w-full">
            <span className="text-[10px] font-headline text-lo uppercase tracking-[0.2em] block mb-3 opacity-50">Estado</span>
            <div 
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold border"
              style={{ 
                backgroundColor: `${currentStatus.color}15`,
                borderColor: `${currentStatus.color}30`,
                color: currentStatus.color
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: currentStatus.color, boxShadow: `0 0 10px ${currentStatus.color}` }} />
              {currentStatus.label.toUpperCase()}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[10px] font-headline text-lo uppercase tracking-[0.2em] block mb-3 opacity-50">Valoración</span>
            <div className="flex gap-1" style={{ color: '#7F77DD' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <span key={s} className={`material-symbols-outlined text-[18px] ${(pad.rating || 0) >= s ? 'fill-1' : 'opacity-10'}`}>
                  grade
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Information */}
        <div className="flex-1 p-10 flex flex-col gap-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-4xl font-bold font-headline text-hi tracking-tighter leading-none mb-2">{pad.name}</h2>
              <div className="flex items-center gap-2 opacity-40">
                <span className="material-symbols-outlined text-sm">language</span>
                <span className="text-[12px] font-medium truncate max-w-[220px]">{domain}</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5">
            {pad.tags?.filter(t => t.trim() !== '').map((tag, i) => (
              <span key={i} className="px-3.5 py-1.5 rounded-lg bg-[#201f21] border border-[#2a2a2e] text-[10px] font-headline text-[#c8c4d5] uppercase tracking-widest font-bold">
                {tag}
              </span>
            ))}
            {(!pad.tags || pad.tags.every(t => !t.trim())) && (
              <span className="px-3 py-1 rounded-lg bg-surface/20 border border-divider/10 text-[10px] text-lo/30 italic">
                Sin etiquetas asignadas
              </span>
            )}
          </div>

          {/* Bento Grid for Plans */}
          {pad.advancedInfo ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#1b1b1d] border-l-2 border-ati-purple shadow-sm">
                <span className="text-[9px] uppercase tracking-[0.2em] text-lo font-headline block mb-2 opacity-60">Plan {pad.planType}</span>
                <p className="text-[12px] font-bold text-hi leading-relaxed">{pad.planDetails || 'Sin detalles'}</p>
              </div>
              <div className="p-4 rounded-2xl bg-[#201f21] border border-[#2a2a2e] shadow-sm">
                <span className="text-[9px] uppercase tracking-[0.2em] text-lo font-headline block mb-2 opacity-60">Suscripción</span>
                <p className="text-[12px] font-bold text-ati-purple-light">{pad.subsPrice || 'No especificada'}</p>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#1b1b1d]/40 border border-[#2a2a2e]/40 border-dashed text-center">
              <span className="text-[11px] text-lo/40 font-medium italic">Información avanzada no disponible</span>
            </div>
          )}

          {/* Note Section */}
          <div className="mt-2">
            <span className="text-[10px] font-headline text-lo uppercase tracking-[0.2em] block mb-4 opacity-50">Nota del Arquitecto</span>
            <p className="text-[13px] italic text-[#c8c4d5] leading-relaxed pl-4 border-l border-ati-purple/30 relative py-1">
              &quot;{pad.note || 'Sin comentarios adicionales.'}&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
