# ATI Project - Guía de Estilo y Reglas Críticas

## 1. Arquitectura de Estilos (Design Tokens)
Todo desarrollo debe respetar los siguientes tokens globales para garantizar consistencia:
- **Base Colors:** `--bg-base: #0e0e10;` (Fondo absoluto), `--bg-surface: #16161a;`, `--elevated: #1e1e24;`.
- **Primary Palette:** `primary: #534AB7`, `accent: #7F77DD`.
- **Typography:**
  - Headings/Wordmark: 'Space Grotesk', sans-serif (700).
  - Body/UI: 'DM Sans', sans-serif (400).
  - Monospace/Code: 'DM Mono' (13px, color #7F77DD).
- **Layout Tokens:** `--radius-pad: 14px;`, `--gap-pads: 10px;`.

## 2. Component System (Stitch)
- **Pads:** Usar siempre un contenedor cuadrado (88x88px o 72x72px). Estructura: fondo color sólido, esquinas 14px, logo centrado superior + texto nombre inferior.
- **Grupos:** Implementar bajo el concepto de "Tabla Periódica":
  - Contenedor con `border-left: 3px solid [color-categoria]`.
  - `group-chip` con etiqueta superior para identificación.

## 3. Regla de Oro de Visibilidad (SEO & Social Copy)
Al alcanzar cada versión funcional (v1.0, v2.0, etc.), el asistente especializado debe proporcionar obligatoriamente:
- **Configuración OG-Image:** Recomendaciones de diseño de tarjetas para WhatsApp, Telegram y redes sociales basadas en los activos actuales.
- **Directivas de Posicionamiento:** Sugerencias de metadatos (Title, Description, Keywords) y estructura de encabezados para mejorar el SEO orgánico.
- **Social Bio:** Copy redactado para compartir el lanzamiento con impacto.

## 4. Reglas de Implementación (Stitch Logic)
Dark Mode: Nativo. No usar gradientes decorativos ni texturas; la jerarquía se logra mediante profundidad de color (surface vs elevated).
Semantic UI: Los estados deben ser claros:
Probada: verde (#639922)
En curso: ámbar (#EF9F27)
Por probar: azul (#378ADD)
Limpieza: Todo componente nuevo debe ser modular dentro de /stitch/[funcionalidad]. Priorizar código limpio y modular, evitando estilos inline complejos cuando se puedan definir mediante clases globales basadas en los tokens anteriores.

5. Reglas de Despliegue y Calidad (Production-Ready)
Strict Typing: Queda prohibido el uso de `any`. Todo objeto o propiedad debe tener una interfaz definida en `src/types/ati.ts`.
Zero Circularity: No importar componentes o utilidades que generen bucles de dependencia. Usar el archivo de tipos como puente neutral.
Build Compliance: 
Escapar siempre entidades especiales en el JSX (usar `&quot;` en lugar de `"`).
Cero variables o imports declarados que no se utilicen en el código final.
SEO & Social Copy: Cada versión funcional sugerirá configuraciones de OG-Image y documentos de posicionamiento (Regla Sugerida por Yeti).
