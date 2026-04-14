'use client';

import React, { useState, useRef } from 'react';
import { usePadStore } from '../../store/usePadStore';
import { GroupRow } from '../pad/GroupRow';
import { PadModal } from '../pad/PadModal';
import { PadInfoCard } from '../pad/PadInfoCard';

const RANDOM_COLORS = ['#7F77DD', '#2b2bd6', '#27AE60', '#378ADD', '#EF9F27', '#D32F2F', '#8E44AD', '#16A085', '#E67E22', '#2980B9'];

export function Board() {
  const { 
    pads, groups, openedTabs, openTab, mode, addGroup, activeCfgId, filters,
    isPadModalOpen, setIsPadModalOpen, editingPadId, setEditingPadId, 
    selectedGroupId, setSelectedGroupId 
  } = usePadStore();
  
  const [hoveredPadId, setHoveredPadId] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const activePads = pads.filter(p => p.configId === activeCfgId);
  
  // Lógica de filtrado inteligente
  const filteredPads = activePads.filter(pad => {
    const matchesSearch = pad.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchesStatus = filters.statuses.length === 0 || filters.statuses.includes(pad.status);
    const matchesRating = (pad.rating || 0) >= filters.minRating;
    const matchesPlan = filters.planTypes.length === 0 || (pad.planType && filters.planTypes.includes(pad.planType));
    const matchesTags = filters.tags.length === 0 || filters.tags.some(tag => pad.tags?.includes(tag));
    
    return matchesSearch && matchesStatus && matchesRating && matchesPlan && matchesTags;
  });

  const primaryPads = pads.filter(p => p.configId === 'cfg_1');

  const handlePadClick = (id: string, url: string) => {
    openTab(id);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleEditClick = (padId: string) => {
    setEditingPadId(padId);
    setIsPadModalOpen(true);
  };

  const handleAddClick = (groupId: string) => {
    setSelectedGroupId(groupId);
    setEditingPadId(undefined); 
    setIsPadModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsPadModalOpen(false);
    setTimeout(() => {
      setEditingPadId(undefined);
      setSelectedGroupId(undefined);
    }, 300);
  };

  const handleAddNewGroup = () => {
    const randomColor = RANDOM_COLORS[Math.floor(Math.random() * RANDOM_COLORS.length)];
    addGroup({
      label: 'NUEVO GRUPO',
      accentColor: randomColor
    });
  };

  const handlePadHover = (id: string, x: number, y: number) => {
    // Actualización de posición independiente
    setMousePos({ x, y });
    
    // Si ya estamos trackeando este ID, no reiniciar el timer
    if (hoverTimerRef.current) return;
    
    hoverTimerRef.current = setTimeout(() => {
      setHoveredPadId(id);
    }, 400); 
  };

  const handlePadHoverLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setHoveredPadId(null);
  };

  // Búsqueda segura del pad bajo el cursor
  const hoveredPad = hoveredPadId ? pads.find(p => p.id === hoveredPadId) : null;

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-6 pb-12">
      {groups.map((group) => {
        const groupPads = filteredPads.filter((pad) => pad.group === group.id);
        
        // Ghost logic: if group is empty in this config, show max 3 cfg_1 pads as ghosts
        const ghostPads = (activeCfgId !== 'cfg_1' && groupPads.length === 0) 
          ? primaryPads.filter(p => p.group === group.id).slice(0, 3)
          : [];

        return (
          <GroupRow 
            key={group.id}
            id={group.id}
            label={group.label}
            accentColor={group.accentColor}
            pads={groupPads.length > 0 ? groupPads : ghostPads}
            isGhostMode={groupPads.length === 0 && ghostPads.length > 0}
            openedTabs={openedTabs}
            onPadClick={handlePadClick}
            onPadHover={handlePadHover}
            onPadHoverLeave={handlePadHoverLeave}
            onEditClick={handleEditClick}
            onAddClick={() => handleAddClick(group.id)}
          />
        );
      })}

      {/* Button to Add New Group at the bottom of the board */}
      {mode === 'edit' && (
        <div className="w-full mt-4 flex border-t border-dashed border-divider/40 pt-12 items-center justify-center">
          <button 
            type="button"
            onClick={handleAddNewGroup}
            className="px-6 py-3 rounded-full border border-dashed border-ati-purple/60 text-ati-purple-light text-sm font-bold font-headline hover:bg-ati-purple/10 transition-colors flex items-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            NUEVA FILA DE HERRAMIENTAS
          </button>
        </div>
      )}

      <PadModal 
        isOpen={isPadModalOpen} 
        onClose={handleCloseModal} 
        defaultGroupId={selectedGroupId} 
        padToEditId={editingPadId}
      />

      {/* Info Card Hover - Renderizado Seguro */}
      {hoveredPadId && hoveredPad && (
        <PadInfoCard 
          pad={hoveredPad}
          mousePos={mousePos}
        />
      )}
    </div>
  );
}
