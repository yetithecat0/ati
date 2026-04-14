'use client';

import React, { useState, useRef } from 'react';
import { AtiSheet } from '../ui/AtiSheet';
import { usePadStore } from '../../store/usePadStore';
import { ATI_PRESETS } from '../../lib/presets';

interface AtiCloudProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AtiCloud({ isOpen, onClose }: AtiCloudProps) {
  const { applyPreset, bulkImport } = usePadStore();
  const [isImporting, setIsImporting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      try {
        // Simple Parser for ATI Markdown
        // Look for hidden JSON if exists, or parse headers
        const jsonMatch = content.match(/<!-- ATI_DATA:(.*) -->/);
        if (jsonMatch) {
          const rawData = atob(jsonMatch[1]);
          const data = JSON.parse(rawData);
          bulkImport(data);
          alert('¡Configuración importada con éxito desde el ADN del archivo!');
          onClose();
        } else {
          alert('Este archivo no contiene datos estructurales de ATI. Intenta exportar un nuevo respaldo primero.');
        }
      } catch (err) {
        console.error(err);
        alert('Error al procesar el archivo. Asegúrate de que es un respaldo válido de ATI.');
      }
      setIsImporting(false);
    };
    reader.readAsText(file);
  };

  return (
    <AtiSheet isOpen={isOpen} onClose={onClose} title="ATI / COMANDO & NUBE">
      <div className="flex flex-col gap-10 h-full">
        
        {/* Sección de Importación */}
        <section className="bg-surface/50 p-8 rounded-2xl border border-divider/20 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-ati-purple/10 flex items-center justify-center text-ati-purple-light mb-2">
            <span className="material-symbols-outlined text-4xl">cloud_upload</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="text-hi font-bold font-headline uppercase tracking-widest text-sm">Sincronizar Respaldo</h3>
            <p className="text-[13px] text-lo leading-relaxed max-w-sm">
              Sube tu archivo Markdown para reconstruir tus Mesas de Trabajo, Pads y preferencias en este dispositivo.
            </p>
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".md" 
            className="hidden" 
          />
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={isImporting}
            className="mt-4 px-8 py-3 rounded-xl bg-ati-purple text-white font-bold text-xs uppercase tracking-widest hover:bg-ati-purple-light transition-all shadow-lg active:scale-95 disabled:opacity-50"
          >
            {isImporting ? 'Procesando...' : 'Seleccionar Archivo .md'}
          </button>
        </section>

        {/* Sección de Presets */}
        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-1 px-2">
            <h3 className="text-hi font-bold font-headline uppercase tracking-widest text-[11px] flex items-center gap-2">
              <span className="material-symbols-outlined text-ati-purple text-lg">verified</span>
              Configuraciones Maestras (Presets)
            </h3>
            <p className="text-[12px] text-lo">Explora entornos pre-configurados por los creadores de ATI.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {ATI_PRESETS.map((preset) => (
              <div 
                key={preset.id} 
                className="group relative bg-surface/30 border border-divider/20 rounded-2xl p-6 hover:border-ati-purple/40 transition-all flex flex-col gap-4"
              >
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-ati-purple-light font-black tracking-tighter uppercase">{preset.author}</span>
                    <h4 className="text-hi font-bold text-base leading-tight mt-1">{preset.name}</h4>
                  </div>
                  <span className="px-2 py-1 rounded bg-base text-[9px] font-bold text-lo border border-divider/20 tracking-tighter uppercase">Verificado</span>
                </div>
                
                <p className="text-[13px] text-lo/80 leading-relaxed h-12 overflow-hidden italic">
                  "{preset.description}"
                </p>

                <button 
                  onClick={() => {
                    if (confirm(`¿Quieres cargar la configuración de ${preset.author}? Esto reemplazará tu Dashboard actual.`)) {
                      applyPreset(preset.id);
                      onClose();
                    }
                  }}
                  className="w-full py-3 rounded-xl border border-divider/40 text-[10px] font-bold uppercase tracking-widest text-lo hover:bg-ati-purple hover:text-white hover:border-ati-purple transition-all shadow-sm"
                >
                  Cargar ADN {preset.author.split(' ')[0]}
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* Advertencia */}
        <div className="mt-auto p-4 rounded-xl bg-orange-500/5 border border-orange-500/10 flex gap-3 items-center">
          <span className="material-symbols-outlined text-orange-500 text-lg">warning</span>
          <p className="text-[11px] text-orange-200/60 leading-tight">
            Cargar un preset o importar un respaldo <strong>sobrescribirá</strong> tus datos actuales. Asegúrate de tener un respaldo propio si no quieres perder tus Pads.
          </p>
        </div>

      </div>
    </AtiSheet>
  );
}
