'use client';

import React from 'react';
import { AtiSheet } from '../ui/AtiSheet';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <AtiSheet isOpen={isOpen} onClose={onClose} title="ATI / NÚCLEO DE INTELIGENCIA">
      <div className="flex flex-col gap-10 text-hi font-headline h-full overflow-y-auto pr-4 pb-12">
        
        {/* Intro con Impacto */}
        <section className="bg-ati-purple/5 p-6 rounded-2xl border border-ati-purple/20">
          <h3 className="text-ati-purple-light text-[12px] font-bold tracking-[0.2em] uppercase mb-4 flex items-center gap-3">
            <span className="material-symbols-outlined text-xl">terminal</span>
            Misión del Sistema
          </h3>
          <p className="text-sm leading-relaxed text-lo/90">
            Alphas Tool Interactive es tu estación de comando digital. Diseñada bajo una arquitectura táctil, ATI centraliza tu flujo de trabajo de IA y herramientas Web en una interfaz minimalista de alta velocidad.
          </p>
        </section>

        {/* Ecosistema ATI */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <HelpCard 
            icon="layers"
            title="Mesas de Trabajo"
            text="Organiza flujos independientes. Soporta hasta 3 Mesas con 5 Plantillas dinámicas cada una."
          />
          <HelpCard 
            icon="filter_list"
            title="Centro de Control"
            text="Filtrado inteligente por semaforización, rating y tipo de plan. Encuentra herramientas en segundos."
          />
          <HelpCard 
            icon="bolt"
            title="Lanzamiento Rápido"
            text="Usa el modo LANZAR para ejecución instantánea. El modo EDITAR desbloquea el ADN de cada Pad."
          />
          <HelpCard 
            icon="database"
            title="Backup Blindado"
            text="Tus datos son tuyos. Exporta configuraciones íntegras en Markdown para máxima portabilidad."
          />
        </div>

        {/* Guía Táctica */}
        <section className="bg-surface/50 p-6 rounded-2xl border border-divider/20">
          <h3 className="text-hi text-[12px] font-bold tracking-[0.2em] uppercase mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-ati-purple text-xl">quick_reference_all</span>
            Guía Táctica de Inicio
          </h3>
          <ul className="flex flex-col gap-6">
            <Step number="1" title="Configuración" text="Activa 'EDITAR' y añade tus herramientas favoritas via URL." />
            <Step number="2" title="Personalización" text="Define colores táctiles, ratings y estados para una estética coherente." />
            <Step number="3" title="Operación" text="Entra en modo 'LANZAR' y utiliza ATI como tu base de operaciones principal." />
          </ul>
        </section>

        {/* Soporte y Contacto */}
        <section className="bg-ati-purple/5 p-6 rounded-2xl border border-ati-purple/10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-ati-purple/10 flex items-center justify-center text-ati-purple-light group-hover:bg-ati-purple group-hover:text-white transition-all">
              <span className="material-symbols-outlined">mail</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-lo tracking-widest">Email</span>
              <a href="mailto:soluciones@datawithia.com" className="text-sm text-hi hover:text-ati-purple-light transition-colors">soluciones@datawithia.com</a>
            </div>
          </div>

          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-ati-purple/10 flex items-center justify-center text-ati-purple-light group-hover:bg-ati-purple group-hover:text-white transition-all">
              <span className="material-symbols-outlined">captive_portal</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-lo tracking-widest">Sitio Web</span>
              <a href="https://datawithia.com" target="_blank" rel="noopener noreferrer" className="text-sm text-hi hover:text-ati-purple-light transition-colors">datawithia.com</a>
            </div>
          </div>

          <div className="flex items-center gap-4 group cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-ati-purple/10 flex items-center justify-center text-ati-purple-light group-hover:bg-ati-purple group-hover:text-white transition-all">
              <span className="material-symbols-outlined">add_call</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-bold text-lo tracking-widest">Celular</span>
              <a href="tel:+51910244293" className="text-sm text-hi hover:text-ati-purple-light transition-colors">+51 910 244 293</a>
            </div>
          </div>
        </section>

        {/* Footer info */}
        <div className="mt-auto pt-8 border-t border-divider/10">
          <div className="flex justify-between items-center text-[10px] tracking-widest uppercase font-bold text-lo/40 mb-4">
            <span>System v1.0 / Stable Build</span>
            <span>2026 Alphas Tools Interactive</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-[11px] text-ati-purple-light font-bold">By: Yeti The Cat</span>
            <span className="text-[9px] text-lo/30 uppercase tracking-[0.3em]">Team DW Automatizaciones Perú</span>
          </div>
        </div>
      </div>
    </AtiSheet>
  );
}

function HelpCard({ icon, title, text }: { icon: string, title: string, text: string }) {
  return (
    <div className="p-5 rounded-2xl border border-divider/20 bg-surface/30 hover:bg-surface/50 transition-all group">
      <div className="flex items-center gap-3 mb-3 text-hi group-hover:text-ati-purple-light transition-colors">
        <span className="material-symbols-outlined text-2xl">{icon}</span>
        <span className="text-xs font-bold uppercase tracking-wider">{title}</span>
      </div>
      <p className="text-[13px] leading-relaxed text-lo/80">{text}</p>
    </div>
  );
}

function Step({ number, title, text }: { number: string, title: string, text: string }) {
  return (
    <li className="flex gap-4 items-start">
      <span className="w-6 h-6 flex-shrink-0 bg-ati-purple/20 text-ati-purple-light border border-ati-purple/30 rounded-lg text-xs font-bold flex items-center justify-center">
        {number}
      </span>
      <div className="flex flex-col gap-1">
        <span className="text-[11px] font-bold uppercase text-hi tracking-wide">{title}</span>
        <p className="text-[13px] text-lo/80 leading-snug">{text}</p>
      </div>
    </li>
  );
}
