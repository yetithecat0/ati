'use client';

import React, { useState } from 'react';
import { usePadStore } from '../../store/usePadStore';
import { Workspace } from '../../types/ati';
import { HelpModal } from './HelpModal';
import { AtiCloud } from './AtiCloud';

export function Sidebar() {
  const { workspaces, activeWorkspaceId, addWorkspace, switchWorkspace, renameWorkspace } = usePadStore();
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isCloudOpen, setIsCloudOpen] = useState(false);

  return (
    <aside className="w-64 bg-surface flex flex-col py-8 sticky left-0 border-r border-divider/20 h-[calc(100vh-64px)]">
      <div className="flex flex-col gap-10 px-6 overflow-y-auto custom-scrollbar pb-8">
        {/* User Profile Header */}
        <div className="flex items-center gap-3 group cursor-pointer pl-0">
          <div className="w-10 h-10 rounded-full bg-ati-purple overflow-hidden border border-divider group-hover:border-ati-purple-light transition-colors shrink-0">
            <img alt="Profile" className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBr40HL02OAwVNPGWSIfC_pO8i5PCAg3e7WtmMbT7018iQZLUdgHC8civWQl3dEPgclMYdmQS4LCWTzrDU1X1A-dJsKHU6h7nuTk39MWIzrgdYoU_m5Q3TVt0Ufw9bvFGFIWQCmtDI4SZeTL9GPsZ_lkOQvu_QMpOF1wmZC3ZKT911nL5B3SU1sWnyGTw3v4g9z5qKtqdTdt7IOYUCsLo93r9U5f-Mm0y1o3cdWZa0GxtTN1N7vqQf1zAEcAeJIvKI4KjayrkDtzBg" />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold font-headline text-hi group-hover:text-white transition-colors tracking-wide uppercase">YETI THE CAT</span>
            <span className="text-[10px] text-lo mt-0.5 font-bold opacity-60">DW - TEAM</span>
          </div>
        </div>

        <nav className="flex flex-col gap-1 -ml-6 pl-6">
          <SidebarLink icon="grid_view" label="Dashboard" isActive />
          <SidebarLink icon="analytics" label="Benchmark IA" isLocked proMessage="Consigue un plan de pago y accede a las funciones PRO" />
          <SidebarLink icon="inventory_2" label="Biblioteca" isLocked proMessage="Consigue un plan de pago y accede a las funciones PRO" />
          <SidebarLink icon="group" label="Colaboradores" isLocked proMessage="Consigue un plan de pago y accede a las funciones PRO" />
          <SidebarLink icon="history" label="Historial" isLocked proMessage="Consigue un plan de pago y accede a las funciones PRO" />
        </nav>

        {/* Mesas de Trabajo Section */}
        <div className="flex flex-col gap-6 pt-4 border-t border-divider/10">
          <div className="flex justify-between items-center px-1">
            <span className="text-[10px] font-bold text-lo/40 tracking-[0.2em] uppercase">Mesas de Trabajo</span>
            {workspaces.length < 3 && (
              <button 
                onClick={() => addWorkspace()}
                className="w-5 h-5 rounded-md bg-white/5 border border-divider/40 flex items-center justify-center text-lo hover:text-ati-purple-light hover:border-ati-purple-light transition-all active:scale-90"
              >
                <span className="material-symbols-outlined text-[14px]">add</span>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-1">
            {workspaces.map((ws) => (
              <WorkspaceItem 
                key={ws.id} 
                workspace={ws} 
                isActive={ws.id === activeWorkspaceId} 
                onSelect={() => switchWorkspace(ws.id)}
                onRename={(name) => renameWorkspace(ws.id, name)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto px-6 flex flex-col gap-2 border-t border-divider/10 pt-6 bg-surface/80 backdrop-blur-sm">
        <button 
          onClick={() => setIsCloudOpen(true)}
          className="flex items-center gap-4 text-lo py-2 px-2 hover:text-ati-purple-light rounded-lg transition-colors w-full group"
        >
          <span className="material-symbols-outlined text-[18px] group-hover:scale-110 transition-transform">cloud_sync</span>
          <span className="text-[10px] font-bold font-headline uppercase mt-px tracking-wider">Nube & Presets</span>
          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-ati-purple animate-pulse" />
        </button>
        <button 
          onClick={() => setIsHelpOpen(true)}
          className="flex items-center gap-4 text-lo py-2 px-2 hover:text-hi rounded-lg transition-colors w-full"
        >
          <span className="material-symbols-outlined text-[18px]">help</span>
          <span className="text-[10px] font-bold font-headline uppercase mt-px tracking-wider">Ayuda</span>
        </button>
        <a className="flex items-center gap-4 text-lo py-2 px-2 hover:text-red-400 rounded-lg transition-colors" href="#">
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span className="text-[10px] font-bold font-headline uppercase mt-px tracking-wider">Cerrar Sesión</span>
        </a>
      </div>

      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
      <AtiCloud isOpen={isCloudOpen} onClose={() => setIsCloudOpen(false)} />
    </aside>
  );
}

function SidebarLink({ icon, label, isLocked, proMessage, isActive }: { icon: string, label: string, isLocked?: boolean, proMessage?: string, isActive?: boolean }) {
  return (
    <div className="relative group pr-4">
      <div 
        className={`flex items-center gap-4 py-2.5 px-4 rounded-r-xl transition-all relative ${
          isActive 
            ? 'text-hi bg-elevated border-l-[3px] border-ati-purple shadow-sm pl-[13px]' 
            : isLocked 
              ? 'text-lo/30 cursor-not-allowed pl-4' 
              : 'text-lo hover:bg-elevated/40 hover:text-hi pl-4'
        }`} 
        onClick={(e) => isLocked && e.preventDefault()}
      >
        <span 
          className="material-symbols-outlined text-[20px] transition-transform group-hover:scale-110 shrink-0"
          style={isActive ? { fontVariationSettings: '"FILL" 1' } : {}}
        >
          {icon}
        </span>
        <span className="text-[10px] font-bold font-headline tracking-widest leading-tight uppercase truncate">
          {label}
        </span>
        
        {isLocked && (
          <span className="material-symbols-outlined text-[14px] absolute right-4 opacity-40">
            lock
          </span>
        )}
      </div>

      {/* PRO Message - Inline Expansion */}
      {isLocked && proMessage && (
        <div className="max-h-0 overflow-hidden group-hover:max-h-20 transition-all duration-500 ease-in-out ml-12 pl-4 border-l border-ati-purple/20">
          <div className="py-2 pr-4">
            <span className="text-[8px] font-bold text-ati-purple-light uppercase tracking-tighter opacity-70">Acceso Pro</span>
            <p className="text-[9px] text-lo/50 leading-tight font-headline mt-0.5">
              {proMessage}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

interface WorkspaceItemProps {
  workspace: Workspace;
  isActive: boolean;
  onSelect: () => void;
  onRename: (name: string) => void;
}

function WorkspaceItem({ workspace, isActive, onSelect, onRename }: WorkspaceItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(workspace.name);
  const { deleteWorkspace, workspaces } = usePadStore();

  const handleBlur = () => {
    setIsEditing(false);
    if (name.trim() && name !== workspace.name) {
      onRename(name.trim());
    } else {
      setName(workspace.name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleBlur();
    if (e.key === 'Escape') {
      setIsEditing(false);
      setName(workspace.name);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm(`¿Estás seguro de eliminar '${workspace.name}'? Se borrarán todas sus configuraciones y pads.`)) {
      deleteWorkspace(workspace.id);
    }
  };

  return (
    <div 
      onClick={() => !isEditing && onSelect()}
      onDoubleClick={() => setIsEditing(true)}
      className={`
        group flex items-center gap-3 py-2.5 px-3 rounded-lg cursor-pointer transition-all duration-200 border relative
        ${isActive 
          ? 'bg-ati-purple/10 border-ati-purple/30 text-hi shadow-sm shadow-ati-purple/5' 
          : 'border-transparent text-lo hover:bg-elevated/40 hover:border-divider/20 hover:text-hi'}
      `}
    >
      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${isActive ? 'bg-ati-purple shadow-[0_0_8px_#534AB7]' : 'bg-divider/60 opacity-0 group-hover:opacity-100'}`} />
      
      {isEditing ? (
        <input
          autoFocus
          className="bg-transparent text-[10px] font-bold font-headline text-hi focus:outline-none w-full uppercase tracking-wider"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <span className="text-[10px] font-bold font-headline truncate uppercase tracking-[0.05em] max-w-[140px]">
          {workspace.name}
        </span>
      )}

      <div className="ml-auto flex items-center gap-1">
        {isActive && !isEditing && workspaces.length > 1 && (
          <button 
            onClick={handleDelete}
            className="w-6 h-6 rounded-md hover:bg-red-500/20 hover:text-red-400 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
          </button>
        )}
        {isActive && !isEditing && (
          <span className="material-symbols-outlined text-[14px] opacity-40">chevron_right</span>
        )}
      </div>
    </div>
  );
}
