# AMZ Creatives · Landing Next.js estilo Dimension

Landing en **Next.js + React + TypeScript + CSS** para el Pack Premium de gestión integral de redes sociales.

## Qué incluye

- Layout inspirado en la mecánica visual de Dimension:
  - columna izquierda fija,
  - columna derecha con scroll,
  - pasos activos sincronizados con `IntersectionObserver`,
  - barra inferior flotante,
  - regla lateral animada,
  - glassmorphism, degradados y tarjetas visuales.
- Secciones:
  1. Plataformas
  2. Estrategia
  3. Contenido
  4. Gestión de comunidad
  5. Informes y mejora

## Cómo ejecutarlo

```bash
npm install
npm run dev
```

Después abre:

```bash
http://localhost:3000
```

## Estructura

```txt
app/
  layout.tsx
  page.tsx
  globals.css
components/
  ServiceLanding.tsx
  LeftPanel.tsx
  FeatureSection.tsx
  FloatingNav.tsx
  VisualCards.tsx
data/
  services.ts
```

## Nota

No copia marca, assets ni textos de Dimension. Replica la experiencia de interacción y la adapta al servicio de redes sociales de AMZ Creatives.
