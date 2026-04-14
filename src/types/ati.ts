export type PadStatus = 'new' | 'por_probar' | 'en_uso' | 'recomendada' | 'done' | 'pending' | 'none';

export interface Pad {
  id: string;
  name: string;
  url: string;
  group: string;
  color: string;
  status: PadStatus;
  rating?: number;
  note?: string;
  configId: string;
  advancedInfo?: boolean;
  planType?: string;
  planDetails?: string;
  subsPrice?: string;
  tags?: string[];
}

export interface Group {
  id: string;
  label: string;
  accentColor: string;
}

export interface Workspace {
  id: string;
  name: string;
}

export interface Config {
  id: string;
  name: string;
  workspaceId: string;
}

export interface Filters {
  search: string;
  status: PadStatus | 'all';
  groupId: string | 'all';
}
