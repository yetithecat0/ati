# Bitácora de Funcionalidades Upgrade Pro - ATI Dashboard

Este documento registra las ideas, recomendaciones técnicas y funcionalidades avanzadas que superan el alcance de la versión web base, para su futura implementación en una versión "Pro" o localmente instalable.

---

## 🚀 [001] Agente Local (ATI Desktop Bridge)
**Estado:** Mapeado / Pendiente

### 📝 Descripción
Desarrollo de un pequeño ejecutable (Sidecar) que actúe como puente entre el navegador y el Sistema Operativo para permitir la interacción directa con archivos locales y aplicaciones instaladas.

### ⚖️ Justificación
- **Superación del Sandbox:** El navegador bloquea por seguridad el lanzamiento de archivos `.exe`. El agente local permite bypass de esto de forma segura.
- **UX Superior:** Permite que un usuario externo añada sus propios programas (Photoshop, VS Code, etc.) simplemente pegando la ruta, sin manipular el Registro de Windows.
- **Flujo Mission Control:** Transforma el Dashboard de un lanzador de webs a un centro de mando total de la computadora.

### 🛠️ Requerimientos Técnicos (Roadmap)
- **Runtime:** Node.js (con empaquetado `pkg`) o Rust (con `Tauri`).
- **Comunicación:** Mini-servidor HTTP en `localhost` con validación de CORS y tokens de seguridad.
- **Funciones Core:**
    - Comando `launch` para ejecutar procesos hijos.
    - Comando `status` para verificar conexión con el Dashboard.
- **Instalador:** Archivo `.exe` o `.msi` para Windows.

---
*Ultima actualización: 2026-04-10*
