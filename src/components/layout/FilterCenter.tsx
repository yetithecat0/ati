'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePadStore } from '../../store/usePadStore';
import { PadStatus, PlanType } from '../../types/ati';

export function FilterCenter() {
  const { filters, setFilters, resetFilters, setIsPadModalOpen, setEditingPadId } = usePadStore();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cerrar al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasActiveFilters = 
    filters.search !== '' || 
    filters.statuses.length > 0 || 
    filters.planTypes.length > 0 || 
    filters.minRating > 0;

  const toggleStatus = (status: PadStatus) => {
    const newStatuses = filters.statuses.includes(status)
      ? filters.statuses.filter(s => s !== status)
      : [...filters.statuses, status];
    setFilters({ statuses: newStatuses });
  };

  return (
    <div className="relative flex items-center gap-2" ref={containerRef}>
      {/* Search Bar Compact */}
      <div className="relative flex items-center bg-base border border-divider/40 rounded-full px-3 py-1.5 focus-within:border-ati-purple/60 transition-all w-48 lg:w-64">
        <span className="material-symbols-outlined text-lo text-[18px]">search</span>
        <input 
          type="text"
          placeholder="Buscar herramienta..."
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="bg-transparent border-none outline-none text-[11px] font-bold font-headline text-hi px-2 w-full placeholder:text-lo/50"
        />
        {filters.search && (
          <button onClick={() => setFilters({ search: '' })} className="text-lo hover:text-hi">
            <span className="material-symbols-outlined text-[14px]">close</span>
          </button>
        )}
      </div>

      {/* Filter Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`relative w-9 h-9 flex items-center justify-center rounded-full border transition-all ${
          isOpen || hasActiveFilters 
            ? 'bg-ati-purple/10 border-ati-purple text-ati-purple-light shadow-glow' 
            : 'bg-base border-divider/40 text-lo hover:text-hi'
        }`}
      >
        <span className="material-symbols-outlined text-[20px]">tune</span>
        {hasActiveFilters && (
          <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-accent rounded-full border-2 border-surface animate-pulse" />
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute top-12 right-0 w-72 bg-elevated border border-divider/20 rounded-[14px] shadow-2xl z-[60] p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-divider/10">
            <span className="text-[10px] font-bold tracking-widest text-lo uppercase">Filtros Avanzados</span>
            <button 
              onClick={resetFilters}
              className="text-[9px] font-bold text-ati-purple hover:text-ati-purple-light underline"
            >
              LIMPIAR TODO
            </button>
          </div>

          {/* Status Selectors */}
          <div className="mb-5">
            <span className="text-[9px] text-lo font-bold block mb-2 opacity-60">ESTADO (SEMAFORIZACIÓN)</span>
            <div className="flex flex-wrap gap-2">
              <StatusChip 
                label="Recomendada" 
                color="#639922" 
                isActive={filters.statuses.includes('recomendada')}
                onClick={() => toggleStatus('recomendada')}
              />
              <StatusChip 
                label="En uso" 
                color="#EF9F27" 
                isActive={filters.statuses.includes('en_uso')}
                onClick={() => toggleStatus('en_uso')}
              />
              <StatusChip 
                label="Por probar" 
                color="#378ADD" 
                isActive={filters.statuses.includes('por_probar')}
                onClick={() => toggleStatus('por_probar')}
              />
            </div>
          </div>

          {/* Plan Type Selector */}
          <div className="mb-5">
            <span className="text-[9px] text-lo font-bold block mb-2 opacity-60">MODELO DE SUSCRIPCIÓN</span>
            <div className="flex flex-wrap gap-2">
              <StatusChip 
                label="Gratuito" 
                color="#27AE60" 
                isActive={filters.planTypes.includes('Gratuito')}
                onClick={() => {
                  const newPlans: PlanType[] = filters.planTypes.includes('Gratuito')
                    ? filters.planTypes.filter(p => p !== 'Gratuito')
                    : [...filters.planTypes, 'Gratuito'];
                  setFilters({ planTypes: newPlans });
                }}
              />
              <StatusChip 
                label="Freemium" 
                color="#EF9F27" 
                isActive={filters.planTypes.includes('Freemium')}
                onClick={() => {
                  const newPlans: PlanType[] = filters.planTypes.includes('Freemium')
                    ? filters.planTypes.filter(p => p !== 'Freemium')
                    : [...filters.planTypes, 'Freemium'];
                  setFilters({ planTypes: newPlans });
                }}
              />
              <StatusChip 
                label="Pago" 
                color="#D32F2F" 
                isActive={filters.planTypes.includes('Pago')}
                onClick={() => {
                  const newPlans: PlanType[] = filters.planTypes.includes('Pago')
                    ? filters.planTypes.filter(p => p !== 'Pago')
                    : [...filters.planTypes, 'Pago'];
                  setFilters({ planTypes: newPlans });
                }}
              />
            </div>
          </div>

          {/* Rating Stars */}
          <div className="mb-4">
            <span className="text-[9px] text-lo font-bold block mb-2 opacity-60">CALIFICACIÓN MÍNIMA</span>
            <div className="flex gap-1.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onClick={() => setFilters({ minRating: filters.minRating === star ? 0 : star })}
                  className={`transition-all ${filters.minRating >= star ? 'text-amber-400 scale-110' : 'text-lo/20 hover:text-lo/40'}`}
                >
                  <span className="material-symbols-outlined text-[22px] filled-icon">
                    {filters.minRating >= star ? 'star' : 'star'}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
             <button 
               onClick={() => {
                 setEditingPadId(undefined);
                 setIsPadModalOpen(true);
                 setIsOpen(false);
               }}
               className="w-full bg-ati-purple text-white py-2.5 rounded-xl text-[10px] font-bold font-headline hover:bg-ati-purple-light transition-all active:scale-95 shadow-lg shadow-ati-purple/20 flex items-center justify-center gap-2"
             >
               <span className="material-symbols-outlined text-[18px]">add</span>
               CREAR NUEVO PAD
             </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatusChip({ label, color, isActive, onClick }: { label: string, color: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full border text-[9px] font-bold transition-all flex items-center gap-1.5 ${
        isActive 
          ? 'bg-opacity-20 border-opacity-100 shadow-sm' 
          : 'bg-transparent border-divider/40 text-lo opacity-50 grayscale hover:grayscale-0 hover:opacity-100'
      }`}
      style={{ 
        borderColor: color, 
        color: isActive ? color : undefined,
        backgroundColor: isActive ? `${color}20` : undefined
      }}
    >
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      {label.toUpperCase()}
    </button>
  );
}
