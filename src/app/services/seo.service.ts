import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({ providedIn: 'root' })
export class SeoService {
  private baseUrl = 'https://valestor.com';

  constructor(@Inject(DOCUMENT) private dom: Document) {}

  updateSeoTags(urlPath: string) {
    // 1. Get the "Clean Path" (remove /ru and query params)
    // Example: /ru/contacts?id=1 -> /contacts
    let pathWithoutQuery = urlPath.split('?')[0];
    let cleanPath = pathWithoutQuery.replace(/^\/ru(\/|$)/, '/').replace(/\/$/, '');
    
    // Ensure it starts with a slash but isn't just double slashes
    if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;
    if (cleanPath === '/') cleanPath = '';

    // 2. Define the URLs
    const enUrl = `${this.baseUrl}${cleanPath}`;
    const ruUrl = `${this.baseUrl}/ru${cleanPath}`;

    // 3. Update Canonical (Self-referencing)
    // If we are on /ru/something, canonical is /ru/something. 
    // If on /something, canonical is /something.
    this.setLinkTag('canonical', this.dom.location.origin + pathWithoutQuery);

    // 4. Update Hreflang Alternates (Must be on every page)
    this.setLinkTag('alternate', enUrl, 'en');
    this.setLinkTag('alternate', ruUrl, 'ru');
    this.setLinkTag('alternate', enUrl, 'x-default'); // Usually points to default/root
  }

  private setLinkTag(rel: string, href: string, hreflang?: string) {
    let selector = `link[rel='${rel}']`;
    if (hreflang) selector += `[hreflang='${hreflang}']`;

    let element: HTMLLinkElement | null = this.dom.querySelector(selector);

    if (!element) {
      element = this.dom.createElement('link');
      element.setAttribute('rel', rel);
      if (hreflang) element.setAttribute('hreflang', hreflang);
      this.dom.head.appendChild(element);
    }
    element.setAttribute('href', href);
  }
}