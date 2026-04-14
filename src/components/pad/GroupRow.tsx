'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PadCard } from './PadCard';
import { usePadStore } from '../../store/usePadStore';
import { Pad } from '../../types/ati';

interface GroupRowProps {
  id: string;
  label: string;
  accentColor: string;
  pads: Pad[];
  openedTabs: Record<string, boolean>;
  isGhostMode?: boolean;
  onPadClick: (id: string, url: string) => void;
  onPadHover?: (id: string, x: number, y: number) => void;
  onPadHoverLeave?: () => void;
  onEditClick: (id: string) => void;
  onAddClick?: () => void;
}

export function GroupRow({ id, label, accentColor, pads, openedTabs, isGhostMode, onPadClick, onPadHover, onPadHoverLeave, onEditClick, onAddClick }: GroupRowProps) {
  const { mode, updateGroup, deleteGroup } = usePadStore();
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  const [editedLabel, setEditedLabel] = useState(label);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditingLabel && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditingLabel]);

  // Synchronize label from props if it changes externally
  useEffect(() => {
    setEditedLabel(label);
  }, [label]);

  if (pads.length === 0 && mode === 'launch') return null; // Only hide empty groups in launch mode

  const handleLabelBlur = () => {
    setIsEditingLabel(false);
    if (editedLabel.trim() !== label && editedLabel.trim() !== '') {
      updateGroup(id, { label: editedLabel.trim() });
    } else {
      setEditedLabel(label);
    }
  };

  const handleLabelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLabelBlur();
    if (e.key === 'Escape') {
      setEditedLabel(label);
      setIsEditingLabel(false);
    }
  };

  const handleDeleteGroup = () => {
    if (confirm(`¿Verdad que deseas eliminar el grupo "${label}" y TODOS sus pads para siempre?`)) {
      deleteGroup(id);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center w-full relative group/row">
      {/* Group Header */}
      <div className="w-[160px] flex flex-col gap-1.5 shrink-0 mb-4 md:mb-0 relative">
        {mode === 'edit' && (
          <button 
            onClick={handleDeleteGroup}
            className="absolute -top-3 left-0 text-red-500/50 hover:text-red-500 hover:scale-110 transition-all z-10"
            title="Eliminar Grupo Entero"
          >
            <span className="material-symbols-outlined text-[14px]">delete</span>
          </button>
        )}

        {mode === 'edit' && isEditingLabel ? (
          <input
            ref={inputRef}
            value={editedLabel}
            onChange={(e) => setEditedLabel(e.target.value)}
            onBlur={handleLabelBlur}
            onKeyDown={handleLabelKeyDown}
            className="text-[10px] uppercase pt-3 pb-0 border-b border-dashed outline-none"
            style={{ color: accentColor, backgroundColor: 'transparent', borderColor: accentColor }}
          />
        ) : (
          <span 
            className={`text-[10px] font-bold font-headline tracking-widest uppercase pt-3 ${mode === 'edit' ? 'cursor-pointer hover:opacity-70' : ''}`}
            style={{ color: accentColor }}
            onClick={() => mode === 'edit' && setIsEditingLabel(true)}
            title={mode === 'edit' ? 'Clic para renombrar Grupo' : ''}
          >
            {label} ({pads.length})
            {mode === 'edit' && <span className="material-symbols-outlined text-[10px] ml-1 opacity-50">edit</span>}
          </span>
        )}
        <div 
          className="h-1 w-[38px] rounded-full opacity-90"
          style={{ backgroundColor: accentColor }}
        ></div>
      </div>

      {/* Pads Container */}
      <div className="flex flex-wrap gap-4 items-center justify-start pl-2 md:pl-0 border-l-[3px] md:border-l-0" style={{ borderLeftColor: accentColor }}>
        {pads.map((pad) => (
          <PadCard 
            key={pad.id}
            id={pad.id}
            name={pad.name}
            url={pad.url}
            color={pad.color}
            status={pad.status}
            rating={pad.rating}
            isGhost={isGhostMode}
            isOpen={openedTabs[pad.id]}
            onClick={() => onPadClick(pad.id, pad.url)}
            onHover={onPadHover}
            onHoverLeave={onPadHoverLeave}
            onEditClick={onEditClick}
          />
        ))}

        {/* Add Card Button - with Long Press for Reuse */}
        {onAddClick && (
          <AddPadButton 
            onAddClick={onAddClick}
            groupId={id}
            mode={mode}
          />
        )}
      </div>
    </div>
  );
}

function AddPadButton({ onAddClick, groupId, mode }: { onAddClick: () => void, groupId: string, mode: string }) {
  const { pads, addPad } = usePadStore();
  const [showReuseMenu, setShowReuseMenu] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Pads from primary config (cfg_1) to reuse
  const reusablePads = pads.filter(p => p.configId === 'cfg_1');

  const startPress = () => {
    timerRef.current = setTimeout(() => {
      setShowReuseMenu(true);
    }, 500); // 500ms for long press
  };

  const endPress = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const handleReuse = (originalPad: Pad) => {
    addPad({
      name: originalPad.name,
      url: originalPad.url,
      color: originalPad.color,
      status: 'none',
      group: groupId,
      rating: originalPad.rating || 0
    });
    setShowReuseMenu(false);
  };

  const getLogoUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
    } catch {
      return null;
    }
  };

  return (
    <div className="relative">
      <button 
        type="button"
        onMouseDown={startPress}
        onMouseUp={endPress}
        onMouseLeave={endPress}
        onClick={() => !showReuseMenu && onAddClick()}
        className={`w-[88px] h-[88px] shrink-0 box-border border-2 border-dashed border-divider/60 rounded-[14px] flex flex-col items-center justify-center hover:border-ati-purple hover:bg-elevated transition-colors group active:scale-95 cursor-pointer shadow-sm ${mode === 'edit' ? 'border-dashed opacity-100' : 'opacity-40 hover:opacity-100'}`}
        title="Click: Nuevo | Clic Sostenido: Reutilizar de Config 1"
      >
        <span className="material-symbols-outlined text-lo group-hover:text-ati-purple-light transition-colors text-[24px]">add</span>
      </button>

      {/* Quick Reuse Menu */}
      {showReuseMenu && (
        <div 
          className="absolute top-0 left-full ml-4 z-[100] bg-surface border border-divider rounded-xl shadow-2xl p-4 w-[280px] animate-in fade-in zoom-in duration-200"
          onMouseLeave={() => setShowReuseMenu(false)}
        >
          <div className="flex items-center justify-between mb-3 border-b border-divider pb-2">
            <span className="text-[10px] font-bold text-lo uppercase tracking-widest">Reutilizar de Config 1</span>
            <button onClick={() => setShowReuseMenu(false)} className="text-lo hover:text-hi">
              <span className="material-symbols-outlined text-sm">close</span>
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto pr-1 custom-scrollbar">
            {reusablePads.map(pad => (
              <button
                key={pad.id}
                onClick={() => handleReuse(pad)}
                className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-elevated transition-colors group"
                title={pad.name}
              >
                <div 
                  className="w-8 h-8 rounded-md flex items-center justify-center text-[10px] font-bold text-white shadow-sm group-hover:scale-110 transition-transform relative overflow-hidden shrink-0"
                  style={{ backgroundColor: pad.color }}
                >
                  <span className="absolute inset-0 flex items-center justify-center z-0 opacity-40">
                    {pad.name.substring(0, 1).toUpperCase()}
                  </span>
                  {getLogoUrl(pad.url) && (
                    <img 
                      src={getLogoUrl(pad.url)!} 
                      alt="" 
                      className="w-full h-full object-cover relative z-10"
                    />
                  )}
                </div>
                <span className="text-[8px] text-lo group-hover:text-hi truncate w-full text-center">{pad.name}</span>
              </button>
            ))}
            {reusablePads.length === 0 && (
              <div className="col-span-4 text-[10px] text-lo text-center py-4">No hay herramientas en Config 1</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
