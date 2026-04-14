'use client';

import React from 'react';
import { usePadStore } from '../../store/usePadStore';
import { FilterCenter } from './FilterCenter';

export function TopBar() {
  const { mode, setMode, configs: allConfigs, activeWorkspaceId, activeCfgId, switchConfig, addConfig, renameConfig, deleteConfig } = usePadStore();

  const configs = allConfigs.filter(c => c.workspaceId === activeWorkspaceId);

  return (
    <header className="flex justify-between items-center w-full px-8 h-16 bg-surface sticky top-0 z-50 border-b border-divider/20">
      <div className="flex items-center pt-1">
        <img 
          src="/og-image.jpg" 
          alt="ATI Logo" 
          className="h-14 w-auto object-contain" 
        />
      </div>
      
      <nav className="hidden md:flex items-center gap-1.5 bg-base p-1 rounded-full border border-divider/40">
        {configs.map((cfg) => (
          <ConfigTab 
            key={cfg.id}
            id={cfg.id}
            name={cfg.name}
            isActive={activeCfgId === cfg.id}
            mode={mode}
            onSwitch={() => switchConfig(cfg.id)}
            onRename={(newName) => renameConfig(cfg.id, newName)}
            onDelete={() => deleteConfig(cfg.id)}
            isOnlyOne={configs.length <= 1}
          />
        ))}
        
        {/* Add Config Button - Max 5 */}
        {configs.length < 5 && (
          <button 
            onClick={addConfig}
            className="w-8 h-8 flex items-center justify-center rounded-full text-lo hover:text-hi hover:bg-elevated/40 transition-all ml-1"
            title="Añadir nueva plantilla (Máx 5)"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
          </button>
        )}
      </nav>
      
      <div className="flex items-center gap-4">
        <div className="flex bg-base rounded-full p-1 border border-divider/40">
          <button 
            onClick={() => setMode('edit')}
            className={`px-4 py-1 text-[10px] font-bold font-headline rounded-full transition-colors ${mode === 'edit' ? 'bg-elevated text-hi shadow-sm' : 'text-lo hover:text-hi'}`}
          >
            EDITAR
          </button>
          <button 
            onClick={() => setMode('launch')}
            className={`px-4 py-1 text-[10px] font-bold font-headline rounded-full transition-colors ${mode === 'launch' ? 'bg-elevated text-hi shadow-sm' : 'text-lo hover:text-hi'}`}
          >
            LANZAR
          </button>
        </div>
        
        <button 
          onClick={() => {
            const { pads, groups, workspaces, configs } = usePadStore.getState();
            const date = new Date().toLocaleDateString();
            
            let content = `# RESPALDO ATI - ${date}\n\n`;
            content += `Este archivo contiene la configuración actual de tus herramientas en el Dashboard ATI.\n\n`;

            groups.forEach(group => {
              const groupPads = pads.filter(p => p.group === group.id);
              if (groupPads.length > 0) {
                content += `## 📁 ${group.label}\n`;
                groupPads.forEach(pad => {
                  content += `### 🛠️ ${pad.name}\n`;
                  content += `- **URL:** ${pad.url}\n`;
                  content += `- **Valoración:** ${'⭐'.repeat(pad.rating || 0)}\n`;
                  content += `- **Estado:** ${pad.status === 'recomendada' ? '✅ Recomendada' : pad.status === 'en_uso' ? '⏳ En uso' : '🔍 Por probar'}\n`;
                  if (pad.note) content += `- **Comentario:** ${pad.note}\n`;
                  content += `\n`;
                });
                content += `---\n\n`;
              }
            });

            // CRITICAL: Inject hidden structural data for perfect import
            const structuralData = { pads, groups, workspaces, configs };
            const base64Data = btoa(JSON.stringify(structuralData));
            content += `\n<!-- ATI_DATA:${base64Data} -->\n`;

            const blob = new Blob([content], { type: 'text/markdown' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `ati_backup_${new Date().toISOString().split('T')[0]}.md`;
            a.click();
            URL.revokeObjectURL(url);
          }}
          className="flex items-center gap-2 text-lo hover:text-hi transition-colors"
        >
          <span className="material-symbols-outlined text-sm pt-px">download</span>
          <span className="text-[10px] font-bold font-headline mt-px">RESPALDO</span>
        </button>

        <button className="flex items-center gap-2 text-lo hover:text-hi transition-colors">
          <span className="material-symbols-outlined text-sm pt-px">ios_share</span>
          <span className="text-[10px] font-bold font-headline mt-px">COMPARTIR</span>
        </button>
        
        <FilterCenter />
      </div>
    </header>
  );
}

function ConfigTab({ id, name, isActive, mode, onSwitch, onRename, onDelete, isOnlyOne }: { 
  id: string, 
  name: string, 
  isActive: boolean, 
  mode: string, 
  onSwitch: () => void, 
  onRename: (val: string) => void,
  onDelete: () => void,
  isOnlyOne: boolean
}) {
  const [isEditing, setIsEditing] = React.useState(false);
  const [tempName, setTempName] = React.useState(name);

  // Auto-edit for new configs
  React.useEffect(() => {
    if (name.startsWith('NUEVA_') && isActive) {
      setIsEditing(true);
    }
  }, [id, isActive]); // Dependencia en ID e Active para disparar en creación

  const handleBlur = () => {
    setIsEditing(false);
    if (tempName.trim() && tempName !== name) {
      onRename(tempName);
    } else {
      setTempName(name);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleBlur();
    if (e.key === 'Escape') {
      setTempName(name);
      setIsEditing(false);
    }
  };

  if (isEditing) {
    return (
      <input
        autoFocus
        value={tempName}
        onChange={(e) => setTempName(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className="px-4 py-1.5 rounded-full text-xs font-bold font-headline bg-elevated border border-ati-purple text-hi transition-all outline-none w-[120px]"
      />
    );
  }

  return (
    <div className="relative group/tab">
      <button 
        onClick={() => mode === 'edit' ? setIsEditing(true) : onSwitch()}
        className={`px-6 py-1.5 rounded-full text-xs font-bold font-headline transition-all ${
          isActive 
            ? 'bg-elevated border border-ati-purple text-ati-purple-light' 
            : 'text-lo hover:text-hi hover:bg-elevated/20'
        }`}
      >
        {name}
      </button>

      {/* Delete button (only in edit mode and if not unique) */}
      {mode === 'edit' && !isOnlyOne && (
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (confirm(`¿Eliminar la plantilla '${name}' para siempre?`)) {
              onDelete();
            }
          }}
          className="absolute -top-1 -right-1 w-4 h-4 bg-hi text-base rounded-full flex items-center justify-center opacity-0 group-hover/tab:opacity-100 hover:scale-110 transition-all z-10"
        >
          <span className="material-symbols-outlined text-[10px] font-bold">close</span>
        </button>
      )}
    </div>
  );
}
