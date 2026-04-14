'use client';

import React, { useState, useEffect } from 'react';
import { AtiSheet } from '../ui/AtiSheet';
import { usePadStore } from '../../store/usePadStore';
import { PadStatus, PlanType } from '../../types/ati';
import { PAD_COLORS } from '../../lib/constants';

interface PadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultGroupId?: string;
  padToEditId?: string;
}

export function PadModal({ isOpen, onClose, defaultGroupId, padToEditId }: PadModalProps) {
  const { pads, groups, addPad, updatePad, deletePad } = usePadStore();
  
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [groupId, setGroupId] = useState('');
  const [color, setColor] = useState(Object.values(PAD_COLORS)[0]);
  const [rating, setRating] = useState(0);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState<PadStatus>('por_probar');
  const [advancedInfo, setAdvancedInfo] = useState(false);
  const [planType, setPlanType] = useState<'Gratuito' | 'Freemium' | 'Pago'>('Gratuito');
  const [planDetails, setPlanDetails] = useState('');
  const [subsPrice, setSubsPrice] = useState('');
  const [tags, setTags] = useState(['', '', '']);

  const padToEdit = padToEditId ? pads.find(p => p.id === padToEditId) : undefined;
  const isEditing = !!padToEdit;

  useEffect(() => {
    if (isOpen) {
      if (isEditing && padToEdit) {
        setName(padToEdit.name);
        setUrl(padToEdit.url);
        setGroupId(padToEdit.group);
        setColor(padToEdit.color);
        setRating(padToEdit.rating || 0);
        setNote(padToEdit.note || '');
        setStatus(padToEdit.status || 'por_probar');
        setAdvancedInfo(padToEdit.advancedInfo || false);
        setPlanType(padToEdit.planType || 'Gratuito');
        setPlanDetails(padToEdit.planDetails || '');
        setSubsPrice(padToEdit.subsPrice || '');
        setTags(padToEdit.tags || ['', '', '']);
      } else {
        setName('');
        setUrl('');
        setGroupId(defaultGroupId || groups[0]?.id || '');
        setColor(Object.values(PAD_COLORS)[0]);
        setRating(0);
        setNote('');
        setStatus('por_probar');
        setAdvancedInfo(false);
        setPlanType('Gratuito');
        setPlanDetails('');
        setSubsPrice('');
        setTags(['', '', '']);
      }
    }
  }, [isOpen, isEditing, padToEdit, defaultGroupId, groups]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !url.trim()) return;

    const padData = {
      name: name.trim(),
      url: url.trim(),
      group: groupId,
      color,
      rating,
      note: note.trim(),
      status,
      advancedInfo,
      planType,
      planDetails: planDetails.trim(),
      subsPrice: subsPrice.trim(),
      tags: tags.map(t => t.trim())
    };

    if (isEditing && padToEditId) {
      updatePad(padToEditId, padData);
    } else {
      addPad(padData);
    }
    onClose();
  };

  const handleDelete = () => {
    if (isEditing && padToEditId) {
      if (confirm(`¿Estás seguro de eliminar el pad '${padToEdit.name}' de forma permanente?`)) {
        deletePad(padToEditId);
        onClose();
      }
    }
  };

  const statusOptions: { value: PadStatus; label: string; color: string; activeBg: string; activeBorder: string }[] = [
    { 
      value: 'por_probar', 
      label: 'Por probar', 
      color: '#378ADD', 
      activeBg: 'rgba(55, 138, 221, 0.1)', 
      activeBorder: '#378ADD' 
    },
    { 
      value: 'en_uso', 
      label: 'En uso', 
      color: '#EF9F27', 
      activeBg: 'rgba(239, 159, 39, 0.1)', 
      activeBorder: '#EF9F27' 
    },
    { 
      value: 'recomendada', 
      label: 'Recomendada', 
      color: '#639922', 
      activeBg: 'rgba(99, 153, 34, 0.1)', 
      activeBorder: '#639922' 
    },
  ];

  return (
    <AtiSheet 
      isOpen={isOpen} 
      onClose={onClose} 
      title={isEditing ? "CONFIGURACIÓN DEL PAD" : "NUEVA HERRAMIENTA"}
      footer={
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-4">
            {isEditing && (
              <button
                onClick={handleDelete}
                className="px-6 py-2.5 rounded-xl bg-red-500/10 text-red-400 font-bold text-[10px] uppercase tracking-widest hover:bg-red-500/20 transition-all border border-red-500/20"
              >
                Eliminar
              </button>
            )}
          </div>
          <div className="flex gap-4">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-white/5 text-lo font-bold text-[10px] uppercase tracking-widest hover:bg-white/10 transition-all border border-divider/40"
            >
              Cancelar
            </button>
            <button
              onClick={handleSubmit}
              className="px-8 py-2.5 rounded-xl bg-ati-purple text-white font-bold text-[10px] uppercase tracking-widest hover:bg-ati-purple-light transition-all shadow-lg active:scale-95"
            >
              {isEditing ? "Actualizar" : "Crear Pad"}
            </button>
          </div>
        </div>
      }
    >
      <form id="pad-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
        
        {/* Status Badge de Edición */}
        {isEditing && (
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-ati-purple/10 border border-ati-purple/20 rounded-lg px-3 py-1 flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-ati-purple animate-pulse" />
              <span className="text-[10px] text-ati-purple-light font-bold tracking-widest uppercase">Herramienta Existente</span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
          {/* Columna Izquierda */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-lo font-headline">Nombre del Pad</label>
              <input 
                type="text" 
                placeholder="Ej. Midjourney V6"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-transparent border-b border-divider py-2 text-hi placeholder-lo/20 focus:outline-none focus:border-[#7F77DD] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-lo font-headline">Categoría</label>
              <select 
                value={groupId} 
                onChange={(e) => setGroupId(e.target.value)}
                className="bg-transparent border-b border-divider py-2 text-hi focus:outline-none focus:border-[#7F77DD] transition-colors appearance-none cursor-pointer"
              >
                {groups.map(g => (
                  <option key={g.id} value={g.id} className="bg-surface">{g.label}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-lo font-headline">Comentario</label>
              <textarea 
                placeholder="Escribe tu opinión sobre la herramienta..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={3}
                className="bg-transparent border-b border-divider py-2 text-hi placeholder-lo/20 focus:outline-none focus:border-[#7F77DD] transition-colors resize-none text-sm leading-relaxed"
              />
            </div>

            <div className="flex flex-col gap-6">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-lo font-headline">Color del Pad</label>
              <div className="grid grid-cols-4 gap-5 pt-1 w-fit">
                {Object.entries(PAD_COLORS).map(([key, hex]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setColor(hex)}
                    className={`w-8 h-8 rounded-full transition-all relative ${color === hex ? 'ring-2 ring-white ring-offset-4 ring-offset-bg-surface scale-110 shadow-[0_0_15px_rgba(255,255,255,0.3)]' : 'hover:scale-125 opacity-70 hover:opacity-100 hover:shadow-md'}`}
                    style={{ backgroundColor: hex }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Columna Derecha */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-lo font-headline">URL</label>
              <input 
                type="url" 
                placeholder="https://..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
                className="bg-transparent border-b border-divider py-2 text-hi placeholder-lo/20 focus:outline-none focus:border-[#7F77DD] transition-colors"
              />
            </div>

            <div className="flex flex-col gap-4">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-lo font-headline">Valoración</label>
              <div className="flex items-center gap-2 py-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="transition-all transform hover:scale-125 hover:-translate-y-1"
                  >
                    <span className={`material-symbols-outlined text-[26px] ${star <= rating ? 'text-[#7F77DD] fill-1' : 'text-lo/20'}`}>
                      grade
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-lo font-headline">Estado de Selección</label>
              <div className="flex flex-col gap-3.5">
                {statusOptions.map((opt) => {
                  const isActive = status === opt.value;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setStatus(opt.value)}
                      className={`
                        flex items-center justify-between px-5 py-3.5 rounded-full border transition-all duration-200 text-sm font-medium
                        ${isActive 
                          ? 'shadow-[0_4px_12px_rgba(0,0,0,0.1)]' 
                          : 'border-divider/50 text-lo hover:border-lo/30 hover:bg-white/5'}
                      `}
                      style={{ 
                        backgroundColor: isActive ? opt.activeBg : 'transparent',
                        borderColor: isActive ? opt.activeBorder : undefined,
                        color: isActive ? 'var(--text-hi)' : undefined
                      }}
                    >
                      <span>{opt.label}</span>
                      <div 
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${isActive ? 'ring-4' : 'border border-divider'}`} 
                        style={{ 
                          backgroundColor: opt.color,
                          boxShadow: isActive ? `0 0 12px ${opt.color}` : 'none',
                          '--tw-ring-color': `${opt.color}33`
                        } as React.CSSProperties}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Sección Avanzada */}
        <div className="mt-4 p-6 rounded-2xl bg-surface/50 border border-divider/40 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-xs font-bold text-hi font-headline">¿Habilitar Información Avanzada?</span>
              <span className="text-[10px] text-lo">Esta información se mostrará en la tarjeta de resumen (Hover).</span>
            </div>
            <button
              type="button"
              onClick={() => setAdvancedInfo(!advancedInfo)}
              className={`w-12 h-6 rounded-full transition-all relative ${advancedInfo ? 'bg-ati-purple' : 'bg-divider'}`}
            >
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${advancedInfo ? 'left-7' : 'left-1'}`} />
            </button>
          </div>

          {advancedInfo && (
            <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Fila 1: Plan y Tarifa (Dual) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-lo font-headline">Tipo de Plan</label>
                  <select 
                    value={planType} 
                    onChange={(e) => setPlanType(e.target.value as PlanType)}
                    className="bg-transparent border-b border-divider py-2 text-hi focus:outline-none focus:border-ati-purple/60 transition-colors appearance-none cursor-pointer"
                  >
                    <option value="Gratuito" className="bg-surface">Gratuito</option>
                    <option value="Freemium" className="bg-surface">Freemium</option>
                    <option value="Pago" className="bg-surface">Pago</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-lo font-headline">Tarifa de Suscripción</label>
                  <input 
                    type="text" 
                    placeholder="Ej. 20$ al mes con 4200 créditos"
                    value={subsPrice}
                    onChange={(e) => setSubsPrice(e.target.value)}
                    className="bg-transparent border-b border-divider py-2 text-hi placeholder-lo/20 focus:outline-none focus:border-ati-purple/60 transition-colors"
                  />
                </div>
              </div>

              {/* Fila 2: Detalles (Full Width) */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-lo font-headline">Detalles del Plan</label>
                <input 
                  type="text" 
                  placeholder="Ej. 300 créditos gratis por mes"
                  value={planDetails}
                  onChange={(e) => setPlanDetails(e.target.value)}
                  className="bg-transparent border-b border-divider py-2 text-hi placeholder-lo/20 focus:outline-none focus:border-ati-purple/60 transition-colors"
                />
              </div>

              {/* Fila 3: Etiquetas (Full Width) */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-lo opacity-50 font-headline">Etiquetas (Máx 3)</label>
                <div className="grid grid-cols-3 gap-3">
                  {tags.map((tag, index) => (
                    <input 
                      key={index}
                      type="text" 
                      placeholder={`Tag ${index + 1}`}
                      value={tag}
                      onChange={(e) => {
                        const newTags = [...tags];
                        newTags[index] = e.target.value;
                        setTags(newTags);
                      }}
                      className="bg-surface border border-divider/40 rounded-[12px] px-4 py-2.5 text-[11px] text-hi focus:outline-none focus:border-ati-purple/60 focus:bg-elevated transition-all"
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

      </form>
    </AtiSheet>
  );
}
