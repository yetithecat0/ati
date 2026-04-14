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

## 4. Reglas de Implementación
- **Modales:** Siempre implementar como `Slide-up sheets` o `Floating Cards` centradas (utilizando `ReactDOM.createPortal`).
- **Estados Semánticos:**
  - Probada: Verde (`#639922`)
  - En curso: Ámbar (`#EF9F27`)
  - Por probar: Azul (`#378ADD`)
- **Limpieza:** Todo componente nuevo debe ser modular. Prohibido el uso de estilos inline complejos.
