import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient } from "@angular/common/http";

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'enabled', // restores top on navigation
      anchorScrolling: 'enabled'            // scrolls to anchors like #section
    })
  ),
  provideHttpClient()
  ]
};