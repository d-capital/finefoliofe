import { Component, OnInit,Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { WindowService } from '../../services/window.service';

@Component({
  selector: 'app-laguage-redirect',
  imports: [],
  templateUrl: './laguage-redirect.component.html',
  styleUrl: './laguage-redirect.component.css'
})
@Injectable({ providedIn: 'root' })
export class LanguageRedirectComponent implements OnInit {

  constructor(
    private router: Router, 
    @Inject(DOCUMENT) private document: Document,
    private browserStorageService: BrowserStorageService,
    private windowService: WindowService
  ) {}
  
  ngOnInit(): void {
    this.checkAndRedirect();
    // Re-check after a short delay in case language was just changed
    setTimeout(() => this.checkAndRedirect(), 100);
  }

  checkAndRedirect(): void {
    const savedLang = this.browserStorageService.getItem('language');
    if (savedLang === 'ru') {
      if (this.windowService.pathname !== '/ru') {
        this.router.navigate(['/ru'], { replaceUrl: true });
      }
    } else {
      // English is default, stay at root
      if (this.windowService.pathname !== '/') {
        this.router.navigate(['/'], { replaceUrl: true });
      }
    }
  }
  addCanonicalLink(url: string): void {
      const link: HTMLLinkElement = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      link.setAttribute('href', url);
      this.document.head.appendChild(link);
  };

  addAlternate(url: string, lang: string): void {
      const link: HTMLLinkElement = this.document.createElement('link');
      link.setAttribute('rel', 'alternate');
      link.setAttribute('hreflang', lang )
      link.setAttribute('href', url);
      this.document.head.appendChild(link);
  };

  
}