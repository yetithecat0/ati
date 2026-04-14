'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Pad, Group, Workspace, Config, Filters } from '../types/ati';

interface PadState {
  pads: Pad[];
  groups: Group[];
  workspaces: Workspace[];
  configs: Config[];
  activeWorkspaceId: string;
  activeCfgId: string;
  openedTabs: { [key: string]: boolean };
  mode: 'edit' | 'launch';

  // Actions
  addPad: (pad: Omit<Pad, 'id' | 'configId'>) => void;
  updatePad: (id: string, padUpdates: Partial<Pad>) => void;
  deletePad: (id: string) => void;
  
  addGroup: (group: Omit<Group, 'id'>) => void;
  updateGroup: (id: string, updates: Partial<Group>) => void;
  deleteGroup: (id: string) => void;
  
  addWorkspace: () => void;
  switchWorkspace: (id: string) => void;
  renameWorkspace: (id: string, name: string) => void;
  deleteWorkspace: (id: string) => void;
  
  addConfig: () => void;
  switchConfig: (id: string) => void;
  renameConfig: (id: string, name: string) => void;
  deleteConfig: (id: string) => void;
  
  openTab: (id: string) => void;
  closeTab: (id: string) => void;
  closeAllTabs: () => void;
  
  setMode: (mode: 'edit' | 'launch') => void;

  // Filters state
  filters: Filters;
  setFilters: (newFilters: Partial<Filters>) => void;
  resetFilters: () => void;

  // UI State
  isPadModalOpen: boolean;
  setIsPadModalOpen: (isOpen: boolean) => void;
  editingPadId?: string;
  setEditingPadId: (id?: string) => void;
  selectedGroupId?: string;
  setSelectedGroupId: (id?: string) => void;

  // Bulk Actions
  bulkImport: (data: { pads: Pad[], configs: Config[], workspaces: Workspace[], groups: Group[] }) => void;
  applyPreset: (presetId: string) => void;
  clearAllData: () => void;
}

const INITIAL_GROUPS: Group[] = [
  { id: '1_llm', label: 'LLMs y Modelos', accentColor: '#7F77DD' },
  { id: '2_ai_tools', label: 'Herramientas IA', accentColor: '#2b2bd6' },
  { id: '3_projects', label: 'Proyectos Activos', accentColor: '#27AE60' },
  { id: '4_apps', label: 'Apps y SaaS', accentColor: '#378ADD' },
  { id: '5_clients', label: 'Webs y Clientes', accentColor: '#EF9F27' },
  { id: '6_vibecoding', label: 'Dw - automatizaciones app', accentColor: '#D32F2F' }
];

const INITIAL_PADS: Pad[] = [
  { id: '1', name: 'Claude', url: 'https://claude.ai', group: '1_llm', color: '#534AB7', status: 'recomendada', rating: 5, configId: 'cfg_1' },
  { id: '2', name: 'ChatGPT', url: 'https://chat.openai.com', group: '1_llm', color: '#16161a', status: 'en_uso', rating: 4, configId: 'cfg_1' },
  { id: '3', name: 'Gemini', url: 'https://gemini.google.com', group: '1_llm', color: '#378ADD', status: 'por_probar', configId: 'cfg_1' }
];

const INITIAL_FILTERS: Filters = {
  search: '',
  statuses: [],
  minRating: 0,
  planTypes: [],
  tags: []
};

export const usePadStore = create<PadState>()(
  persist(
    (set) => ({
      pads: INITIAL_PADS,
      groups: INITIAL_GROUPS,
      workspaces: [{ id: 'ws_1', name: 'MESA DE TRABAJO 1' }],
      configs: [
        { id: 'cfg_1', name: 'ARTURO', workspaceId: 'ws_1' },
        { id: 'cfg_2', name: 'DESARROLLO', workspaceId: 'ws_1' }
      ],
      activeWorkspaceId: 'ws_1',
      activeCfgId: 'cfg_1',
      openedTabs: {},
      mode: 'launch',

      addPad: (pad) => set((state) => ({
        pads: [...state.pads, { ...pad, id: Math.random().toString(36).substring(2, 9), configId: state.activeCfgId }]
      })),
      
      updatePad: (id, padUpdates) => set((state) => ({
        pads: state.pads.map((p) => (p.id === id ? { ...p, ...padUpdates } : p))
      })),
      
      deletePad: (id) => set((state) => ({
        pads: state.pads.filter((p) => p.id !== id)
      })),

      addGroup: (group) => set((state) => ({
        groups: [...state.groups, { ...group, id: Math.random().toString(36).substring(2, 9) }]
      })),

      updateGroup: (id, updates) => set((state) => ({
        groups: state.groups.map(g => (g.id === id ? { ...g, ...updates } : g))
      })),

      deleteGroup: (id) => set((state) => ({
        groups: state.groups.filter(g => g.id !== id),
        pads: state.pads.filter(p => p.group !== id)
      })),

      addWorkspace: () => set((state) => {
        if (state.workspaces.length >= 3) return state;

        const newWsId = `ws_${Math.random().toString(36).substring(2, 9)}`;
        const newCfgId = `cfg_${Math.random().toString(36).substring(2, 9)}`;
        const newWs = { id: newWsId, name: `MESA DE TRABAJO ${state.workspaces.length + 1}` };
        const initialCfg = { id: newCfgId, name: 'CONFIG 1', workspaceId: newWsId };
        
        return {
          workspaces: [...state.workspaces, newWs],
          configs: [...state.configs, initialCfg],
          activeWorkspaceId: newWsId,
          activeCfgId: newCfgId,
          openedTabs: {},
          mode: 'edit'
        };
      }),

      switchWorkspace: (id) => set((state) => {
        const firstCfg = state.configs.find(c => c.workspaceId === id);
        return {
          activeWorkspaceId: id,
          activeCfgId: firstCfg ? firstCfg.id : '',
          openedTabs: {}
        };
      }),

      renameWorkspace: (id, name) => set((state) => ({
        workspaces: state.workspaces.map(ws => ws.id === id ? { ...ws, name: name.toUpperCase() } : ws)
      })),

      deleteWorkspace: (id) => set((state) => {
        if (state.workspaces.length <= 1) return state;
        const newWorkspaces = state.workspaces.filter(ws => ws.id !== id);
        const newActiveWsId = state.activeWorkspaceId === id ? newWorkspaces[0].id : state.activeWorkspaceId;
        const firstCfg = state.configs.find(c => c.workspaceId === newActiveWsId);

        return {
          workspaces: newWorkspaces,
          activeWorkspaceId: newActiveWsId,
          activeCfgId: firstCfg ? firstCfg.id : '',
          configs: state.configs.filter(c => c.workspaceId !== id),
          pads: state.pads.filter(p => {
            const cfg = state.configs.find(c => c.id === p.configId);
            return cfg?.workspaceId !== id;
          }),
          openedTabs: {}
        };
      }),

      addConfig: () => set((state) => {
        const currentWsConfigs = state.configs.filter(c => c.workspaceId === state.activeWorkspaceId);
        if (currentWsConfigs.length >= 5) return state;
        
        const newId = `cfg_${Math.random().toString(36).substring(2, 9)}`;
        return {
          configs: [...state.configs, { id: newId, name: `NUEVA_${currentWsConfigs.length + 1}`, workspaceId: state.activeWorkspaceId }],
          activeCfgId: newId,
          openedTabs: {}
        };
      }),

      deleteConfig: (id) => set((state) => {
        const currentWsConfigs = state.configs.filter(c => c.workspaceId === state.activeWorkspaceId);
        if (currentWsConfigs.length <= 1) return state;
        
        const newConfigs = state.configs.filter(c => c.id !== id);
        const wsConfigsRestanted = newConfigs.filter(c => c.workspaceId === state.activeWorkspaceId);
        const newActiveId = state.activeCfgId === id ? wsConfigsRestanted[0].id : state.activeCfgId;
        
        return {
          configs: newConfigs,
          activeCfgId: newActiveId,
          pads: state.pads.filter(p => p.configId !== id),
          openedTabs: {}
        };
      }),

      renameConfig: (id, name) => set((state) => ({
        configs: state.configs.map((c) => (c.id === id ? { ...c, name: name.toUpperCase() } : c))
      })),

      switchConfig: (id) => set({ activeCfgId: id, openedTabs: {} }),

      openTab: (id) => set((state) => ({
        openedTabs: { ...state.openedTabs, [id]: true }
      })),

      closeTab: (id) => set((state) => {
        const newTabs = { ...state.openedTabs };
        delete newTabs[id];
        return { openedTabs: newTabs };
      }),
      
      closeAllTabs: () => set({ openedTabs: {} }),

      setMode: (mode) => set({ mode }),

      filters: INITIAL_FILTERS,
      setFilters: (newFilters) => set((state) => ({
        filters: { ...state.filters, ...newFilters }
      })),
      resetFilters: () => set({ filters: INITIAL_FILTERS }),

      isPadModalOpen: false,
      setIsPadModalOpen: (isOpen) => set({ isPadModalOpen: isOpen }),
      editingPadId: undefined,
      setEditingPadId: (id) => set({ editingPadId: id }),
      selectedGroupId: undefined,
      setSelectedGroupId: (id) => set({ selectedGroupId: id }),

      bulkImport: (data) => set(() => ({
        pads: data.pads,
        configs: data.configs,
        workspaces: data.workspaces,
        groups: data.groups,
        activeWorkspaceId: data.workspaces[0]?.id || 'ws_1',
        activeCfgId: data.configs[0]?.id || 'cfg_1',
        openedTabs: {}
      })),

      applyPreset: (presetId) => {
        import('../lib/presets').then((m) => {
          const preset = m.ATI_PRESETS.find(p => p.id === presetId);
          if (preset) {
            set(() => ({
              pads: preset.pads,
              configs: preset.configs,
              workspaces: preset.workspaces,
              groups: preset.groups,
              activeWorkspaceId: preset.workspaces[0].id,
              activeCfgId: preset.configs[0].id,
              openedTabs: {},
              mode: 'launch'
            }));
          }
        });
      },

      clearAllData: () => set(() => ({
        pads: [],
        workspaces: [{ id: 'ws_1', name: 'MESA VACÍA' }],
        configs: [{ id: 'cfg_1', name: 'CONFIG 1', workspaceId: 'ws_1' }],
        groups: INITIAL_GROUPS,
        activeWorkspaceId: 'ws_1',
        activeCfgId: 'cfg_1',
        openedTabs: {}
      }))
    }),
    {
      name: 'ati-pad-storage'
    }
  )
);
