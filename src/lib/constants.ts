export const PAD_COLORS = {
  purple: '#534AB7',
  indigo: '#3730a3',
  blue: '#185FA5',
  teal: '#0e7490',
  emerald: '#1D9E75',
  green: '#065f46',
  lime: '#4D7C0F',
  amber: '#BA7517',
  orange: '#9a3412',
  coral: '#D85A30',
  red: '#A32D2D',
  magenta: '#be185d',
  violet: '#6d28d9',
  purpleBright: '#A855F7',
  charcoal: '#353437',
  slate: '#475569',
};

export const GROUPS = [
  { id: 'llm', label: 'LLMs y MODELOS', accentColor: PAD_COLORS.purple },
  { id: 'ai_tools', label: 'HERRAMIENTAS IA', accentColor: PAD_COLORS.violet },
  { id: 'projects', label: 'PROYECTOS ACTIVOS', accentColor: PAD_COLORS.darkGreen },
  { id: 'apps', label: 'Apps y SaaS', accentColor: PAD_COLORS.blue },
  { id: 'clients', label: 'WEBS y CLIENTES', accentColor: PAD_COLORS.rust },
  { id: 'vibe', label: 'Vibe Coding', accentColor: PAD_COLORS.purpleBright },
];

export const STATUS_COLORS: Record<string, string> = {
  recomendada: '#639922',
  en_uso: '#EF9F27',
  por_probar: '#378ADD',
  new: '#378ADD',
  done: '#639922',
  pending: '#EF9F27',
  none: 'transparent',
};
