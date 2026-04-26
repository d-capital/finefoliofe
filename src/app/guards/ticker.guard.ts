import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GeoService } from '../services/geo.service';
import { BrowserStorageService } from '../services/browser-storage.service';

export const tickerGuard: CanActivateFn = async (route, state) => {
  const geoService = inject(GeoService);
  const router = inject(Router);
  const browserStorageService = inject(BrowserStorageService)

  const ticker = route.paramMap.get('exchange-ticker');
  const restrictedTickers = ['nasdaq-meta']; // Add your specific tickers here
  const lang = await browserStorageService.getItem("language");
  if (restrictedTickers.includes(ticker ?? '')) {
    const isRU = await geoService.isRussianUser() || lang === "ru";
    if (isRU) {
      router.navigate(['/']); // Redirect away from restricted ticker
      return false;
    }
  }
  
  return true;
};