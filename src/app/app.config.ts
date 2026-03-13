import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideHttpClient, withFetch } from "@angular/common/http";

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes,
    withInMemoryScrolling({
      scrollPositionRestoration: 'enabled', // restores top on navigation
      anchorScrolling: 'enabled'            // scrolls to anchors like #section
    })
  ),
  provideHttpClient(withFetch()), provideClientHydration(withEventReplay())
  ]
};