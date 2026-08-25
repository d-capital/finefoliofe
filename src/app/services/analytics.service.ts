import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BrowserStorageService } from './browser-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  private loaded = false;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    @Inject(PLATFORM_ID) private platformId: Object,
    private browserStorageService: BrowserStorageService
  ) {}

  loadIfConsented(): void {
    if (!isPlatformBrowser(this.platformId) || this.loaded ||
      this.browserStorageService.getItem('cookieConsent') !== 'true') {
      return;
    }

    this.loaded = true;
    this.loadYandexMetrika();
    this.loadGoogleAnalytics();
  }

  private loadYandexMetrika(): void {
    const scriptUrl = 'https://mc.yandex.ru/metrika/tag.js?id=106716051';
    if (this.document.querySelector(`script[src="${scriptUrl}"]`)) {
      return;
    }

    const windowWithAnalytics = window as any;
    windowWithAnalytics.ym = windowWithAnalytics.ym || function (...args: any[]) {
      (windowWithAnalytics.ym.a = windowWithAnalytics.ym.a || []).push(args);
    };
    windowWithAnalytics.ym.l = Date.now();
    windowWithAnalytics.ym(106716051, 'init', {
      ssr: true,
      webvisor: true,
      clickmap: true,
      ecommerce: 'dataLayer',
      referrer: this.document.referrer,
      url: window.location.href,
      accurateTrackBounce: true,
      trackLinks: true
    });

    const script = this.document.createElement('script');
    script.async = true;
    script.src = scriptUrl;
    this.document.head.appendChild(script);
  }

  private loadGoogleAnalytics(): void {
    const measurementId = 'G-X7RB0BS1VH';
    const scriptUrl = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    if (this.document.querySelector(`script[src="${scriptUrl}"]`)) {
      return;
    }

    const windowWithAnalytics = window as any;
    windowWithAnalytics.dataLayer = windowWithAnalytics.dataLayer || [];
    windowWithAnalytics.gtag = function (...args: any[]) {
      windowWithAnalytics.dataLayer.push(args);
    };
    windowWithAnalytics.gtag('js', new Date());
    windowWithAnalytics.gtag('config', measurementId);

    const script = this.document.createElement('script');
    script.async = true;
    script.src = scriptUrl;
    this.document.head.appendChild(script);
  }
}