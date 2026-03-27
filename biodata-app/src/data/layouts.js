import { lazy } from 'react';

export const LAYOUTS = [
  { id: "classic", label: "Classic", component: lazy(() => import('../components/layouts/LayoutClassic')) },
  { id: "floral", label: "Floral", component: lazy(() => import('../components/layouts/LayoutFloral')) },
  { id: "minimalist", label: "Minimalist", component: lazy(() => import('../components/layouts/LayoutMinimalist')) },
  { id: "modernCard", label: "Modern Card", component: lazy(() => import('../components/layouts/LayoutModernCard')) },
  { id: "ornate", label: "Traditional", component: lazy(() => import('../components/layouts/LayoutOrnate')) },
  { id: "elegant", label: "Elegant", component: lazy(() => import('../components/layouts/LayoutElegant')) },
  { id: "royal", label: "Royal", component: lazy(() => import('../components/layouts/LayoutRoyal')) },
  { id: "contemporary", label: "Contemporary", component: lazy(() => import('../components/layouts/LayoutContemporary')) },
];
