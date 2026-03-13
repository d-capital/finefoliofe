import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class WindowService {
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get window(): Window | null {
    return this.isBrowser ? window : null;
  }

  get location(): Location | null {
    return this.isBrowser ? window.location : null;
  }

  get pathname(): string {
    return this.isBrowser ? window.location.pathname : '/';
  }

  addEventListener(event: string, handler: EventListener): void {
    if (!this.isBrowser) return;
    window.addEventListener(event, handler);
  }

  removeEventListener(event: string, handler: EventListener): void {
    if (!this.isBrowser) return;
    window.removeEventListener(event, handler);
  }

  reload(): void {
    if (!this.isBrowser) return;
    window.location.reload();
  }

  replace(url: string): void {
    if (!this.isBrowser) return;
    window.location.replace(url);
  }

  navigate(url: string): void {
    if (!this.isBrowser) return;
    window.location.href = url;
  }

  isBrowserEnvironment(): boolean {
    return this.isBrowser;
  }
}
