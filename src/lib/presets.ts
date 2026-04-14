import { Pad, Group, Workspace, Config } from '../types/ati';

export interface Preset {
  id: string;
  name: string;
  author: string;
  description: string;
  workspaces: Workspace[];
  configs: Config[];
  pads: Pad[];
  groups: Group[];
}

export const ATI_PRESETS: Preset[] = [
  {
    id: 'preset_yeti',
    name: 'YETI THE CAT MASTER',
    author: 'Yeti The Cat',
    description: 'La configuración definitiva de DW Automatizaciones. Centraliza LLMs, herramientas de generación de medios y flujos de diseño avanzados.',
    workspaces: [
      { id: 'ws_1', name: 'MESA DE TRABAJO 1' },
      { id: 'ws_c2zioyx', name: 'MESA DE TRABAJO 2' },
      { id: 'ws_bpc854x', name: 'MESA DE TRABAJO 3' }
    ],
    configs: [
      { id: 'cfg_1', name: 'ARTURO', workspaceId: 'ws_1' },
      { id: 'cfg_2', name: 'DESARROLLO', workspaceId: 'ws_1' },
      { id: 'cfg_29mg9ym', name: 'YETI', workspaceId: 'ws_c2zioyx' },
      { id: 'cfg_vboxvks', name: 'CONFIG 1', workspaceId: 'ws_bpc854x' },
      { id: 'cfg_y2kndzb', name: 'NUEVA_2', workspaceId: 'ws_c2zioyx' },
      { id: 'cfg_gxs7fig', name: 'NUEVA_3', workspaceId: 'ws_c2zioyx' }
    ],
    groups: [
      { id: '1_llm', label: 'LLMs y Modelos', accentColor: '#7F77DD' },
      { id: '2_ai_tools', label: 'Herramientas IA', accentColor: '#2b2bd6' },
      { id: '3_projects', label: 'Proyectos Activos', accentColor: '#27AE60' },
      { id: '4_apps', label: 'Apps y SaaS', accentColor: '#378ADD' },
      { id: '5_clients', label: 'Webs y Clientes', accentColor: '#EF9F27' },
      { id: '6_vibecoding', label: 'Dw - automatizaciones app', accentColor: '#D32F2F' },
      { id: 'k7hscpo', label: 'diseño para documentos', accentColor: '#2980B9' },
      { id: 'sfb0vm9', label: 'documentos internos dw', accentColor: '#8E44AD' }
    ],
    pads: [
      { id: '1', name: 'Claude', url: 'https://claude.ai', group: '1_llm', color: '#534AB7', status: 'done', configId: 'cfg_1' },
      { id: '2', name: 'ChatGPT', url: 'https://chat.openai.com', group: '1_llm', color: '#444441', status: 'pending', configId: 'cfg_1' },
      { id: '3', name: 'Gemini', url: 'https://gemini.google.com', group: '1_llm', color: '#185FA5', status: 'done', configId: 'cfg_1' },
      { id: '5', name: 'Web Guti', url: 'https://gutiperu.com', group: '3_projects', color: '#065f46', status: 'por_probar', rating: 4, note: 'es una pagina interesante de fotografia', configId: 'cfg_1' },
      { id: '6', name: 'Suno', url: 'https://suno.com', group: '2_ai_tools', color: '#be185d', status: 'new', configId: 'cfg_1' },
      { id: '7', name: 'Midjourney', url: 'https://midjourney.com', group: '2_ai_tools', color: '#be185d', status: 'por_probar', rating: 4, note: 'he visto que tiene buen rendimiento para crear imagenes', configId: 'cfg_1' },
      { id: '8', name: 'Figma', url: 'https://figma.com', group: '4_apps', color: '#9a3412', status: 'done', configId: 'cfg_1' },
      { id: '9', name: 'Notion', url: 'https://notion.so', group: '4_apps', color: '#353437', status: 'done', configId: 'cfg_1' },
      { id: '10', name: 'Vercel', url: 'https://vercel.com', group: '4_apps', color: '#444441', status: 'done', configId: 'cfg_1' },
      { id: 'mcz6mh3', name: 'Latelier Peruano - Joyeria suiza', url: 'https://latelierperuano.ch/', group: '5_clients', color: '#BA7517', status: 'new', configId: 'cfg_1' },
      { id: 'qec4if3', name: 'Audisynth - DW', url: 'https://sessionmeeting.vercel.app/dashboard', group: '6_vibecoding', color: '#D85A30', rating: 3, note: 'Ayuda a capturar la información más importante de las reuniones, conversaciones, clases y podcast', status: 'recomendada', configId: 'cfg_1' },
      { id: 'l5jgqw5', name: 'Mapeo Térmico', url: 'https://mapefarco-eight.vercel.app/login', group: '6_vibecoding', color: '#534AB7', rating: 3, status: 'por_probar', configId: 'cfg_1' },
      { id: 'd7b9u0d', name: 'Edit.org - Membretes', url: 'https://edit.org/edit/my/ld5yj61kq1w40wgo#', group: 'k7hscpo', color: '#4D7C0F', rating: 4, status: 'recomendada', configId: 'cfg_1' },
      { id: 'w4jspes', name: 'RS- excel', url: 'https://docs.google.com/spreadsheets/d/1va7FeXVRgKIovKzs8nreKP-SYJ8RooQ2Q0u_3qLz5YM/edit?gid=1136704747#gid=1136704747', group: 'sfb0vm9', color: '#534AB7', rating: 5, status: 'en_uso', configId: 'cfg_1' },
      { id: 'oawn6qv', name: 'Build', url: 'https://aistudio.google.com/apps', group: '2_ai_tools', color: '#534AB7', rating: 1, note: 'Build your ideas with Gemini', status: 'por_probar', configId: 'cfg_1' },
      { id: 'puxhq39', name: 'vids veo3', url: 'https://docs.google.com/videos/d/1CfmxxgQhEInvUBeWmowEW6N5fFuaX01gHPUDi5MRMVY/edit?pli=1&scene=id.p#scene=id.p', group: '2_ai_tools', color: '#534AB7', rating: 0, note: 'herramienta para crear videos y plantillas de ppt en presentaciones de calidad', status: 'por_probar', configId: 'cfg_1' },
      { id: 'o4s61pj', name: 'Res. Esmeralda', url: 'https://yetithecat0.github.io/residencial-esmeralda/', group: '5_clients', color: '#534AB7', rating: 0, status: 'en_uso', configId: 'cfg_1' },
      { id: '8xnezzx', name: 'Miro - Pizarra', url: 'https://miro.com/app/board/uXjVGo9qPiY=/?userEmail=venusfitnessperu@gmail.com&track=true&utm_source=notification&utm_medium=email&utm_campaign=add-to-team-and-board&utm_content=go-to-board&share_link_id=792194701946&lid=ky325hb341sr', group: '4_apps', color: '#534AB7', rating: 5, status: 'recomendada', configId: 'cfg_1' },
      { id: 'nvqow2w', name: 'OG-image view', url: 'https://www.opengraph.xyz/', group: 'k7hscpo', color: '#534AB7', rating: 3, status: 'en_uso', configId: 'cfg_1' },
      { id: 'mzhxwsw', name: 'G-AI-Studio', url: 'https://aistudio.google.com/prompts/new_chat?model=gemini-3.1-flash-lite-preview', group: '1_llm', color: '#534AB7', rating: 5, note: 'Diseñar, Aterrizar y Plantear proyectos de desarrollo. Redacción de prompts y documentos', status: 'recomendada', configId: 'cfg_1' },
      { id: 'l24naul', name: 'Producer AI', url: 'https://www.producer.ai/', group: '2_ai_tools', color: '#534AB7', rating: 5, note: 'Generación de canciones, musica y sonidos con IA prompts', status: 'recomendada', configId: 'cfg_1' },
      { id: 'dw3teqm', name: 'Stitch', url: 'https://stitch.withgoogle.com/', group: '2_ai_tools', color: '#534AB7', rating: 5, status: 'recomendada', configId: 'cfg_1' },
      { id: '8xe6paz', name: 'Drive DW', url: 'https://drive.google.com/drive/folders/1tma9j6ylaK5z4nhB1MgefTzTz6I88hDP', group: 'sfb0vm9', color: '#534AB7', rating: 5, status: 'en_uso', configId: 'cfg_1' },
      { id: 't4rd0hr', name: 'Flow - img', url: 'https://labs.google/fx/es-419/tools/flow/project/89f0740e-63ef-4600-b121-7f8315f8a179', group: '2_ai_tools', color: '#534AB7', rating: 5, note: 'Generación de imagenes y video sin tokens', status: 'recomendada', configId: 'cfg_1', advancedInfo: true, planType: 'Gratuito', planDetails: 'Creditos ilimitados para creación de imagenes, para videos de 7 seg se renuevan los creditos por dia', subsPrice: '20 $ al mes', tags: ['gratis', 'calidad', 'videos'] },
      { id: 'aeek4ge', name: 'Photopea', url: 'https://www.photopea.com/', group: 'k7hscpo', color: '#534AB7', rating: 5, status: 'recomendada', configId: 'cfg_1' },
      { id: 'v8v4497', name: 'Favicon', url: 'https://favicon.im/es/generator', group: 'k7hscpo', color: '#534AB7', rating: 5, status: 'recomendada', configId: 'cfg_1' },
      { id: '69b4z0h', name: 'Vectormagic', url: 'https://vectormagic.com/', group: 'k7hscpo', color: '#534AB7', rating: 3, status: 'en_uso', configId: 'cfg_1' },
      { id: 'xffy4h6', name: 'ComfyUI', url: 'https://cloud.comfy.org/', group: '2_ai_tools', color: '#be185d', rating: 4, status: 'en_uso', advancedInfo: true, planType: 'Freemium', planDetails: '300 creditos gratis por mes', subsPrice: '20 $ al mes 4200 créditos', tags: ['nodos', 'freemium', 'all in one'], configId: 'cfg_1' },
      { id: 'qnq3o0e', name: 'Gemini', url: 'https://gemini.google.com', color: '#185FA5', status: 'none', group: '1_llm', rating: 0, configId: 'cfg_2' },
      { id: 'yi5gj8y', name: 'Gemini', url: 'https://gemini.google.com', color: '#185FA5', status: 'none', group: '1_llm', rating: 0, configId: 'cfg_29mg9ym' }
    ]
  },
  {
    id: 'preset_arturo',
    name: 'ARTURO DEV BASE',
    author: 'Arturo Dev',
    description: 'Enfoque minimalista para desarrollo web. Incluye Vercel, Figma y herramientas esenciales de despliegue.',
    workspaces: [{ id: 'ws_arturo', name: 'MESA DEV CORE' }],
    configs: [
      { id: 'cfg_arturo_dev', name: 'FRONTEND', workspaceId: 'ws_arturo' },
      { id: 'cfg_arturo_infra', name: 'INFRA', workspaceId: 'ws_arturo' }
    ],
    groups: [
      { id: '4_apps', label: 'SaaS & Apps', accentColor: '#378ADD' },
      { id: '8_dev', label: 'Development', accentColor: '#534AB7' }
    ],
    pads: [
      { id: 'a1', name: 'Vercel', url: 'https://vercel.com', group: '8_dev', color: '#000000', status: 'recomendada', rating: 5, configId: 'cfg_arturo_dev' },
      { id: 'a2', name: 'GitHub', url: 'https://github.com', group: '8_dev', color: '#16161a', status: 'en_uso', rating: 5, configId: 'cfg_arturo_dev' },
      { id: 'a3', name: 'Supabase', url: 'https://supabase.com', group: '4_apps', color: '#27AE60', status: 'por_probar', rating: 4, configId: 'cfg_arturo_infra' }
    ]
  }
];
