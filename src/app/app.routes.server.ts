import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'stocks/:exchange-ticker/peter-lynch-fair-value-calculator',
    renderMode: RenderMode.Server, // <--- This disables Prerendering for this route
  },
  {
    path: 'ru/stocks/:exchange-ticker/peter-lynch-fair-value-calculator',
    renderMode: RenderMode.Server,
  },
  {
    path: '**', // Default for all other routes
    renderMode: RenderMode.Server,
  },
];