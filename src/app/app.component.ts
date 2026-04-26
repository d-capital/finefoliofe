import { Component, OnInit, Injectable, Inject} from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { SeoService } from './services/seo.service';
import { BrowserStorageService } from './services/browser-storage.service';
import { WindowService } from './services/window.service';
import { CookieConsentComponent } from './components/cookie-consent/cookie-consent.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CookieConsentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
@Injectable({ providedIn: 'root' })
export class AppComponent implements OnInit {
  title = 'finefolio-fe';
  isAlive:boolean = false;
  constructor(
    private route:ActivatedRoute, 
    @Inject(DOCUMENT) private document: Document, 
    private seoService: SeoService,
    private router: Router,
    private browserStorageService: BrowserStorageService,
    private windowService: WindowService,
  ) {
    this.syncLanguageWithUrl();
    // Listen for navigation events to keep language in sync
    this.windowService.addEventListener('popstate', () => this.syncLanguageWithUrl());
  }

  syncLanguageWithUrl() {
    const pathname = this.windowService.pathname;
    const pathSegment = pathname.split('/')[1];
    const isUserLangSet = this.browserStorageService.getItem('isUserLangSet');
    if (isUserLangSet !== 'yes') {
      if (pathSegment === 'ru') {
        this.browserStorageService.setItem('language', 'ru');
        this.browserStorageService.setItem('isUserLangSet', 'yes');
      } else {
        this.browserStorageService.setItem('language', 'en');
        this.browserStorageService.setItem('isUserLangSet', 'yes');
      }
    }
  }
  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.seoService.updateSeoTags(this.windowService.pathname);
    });
    this.reloadLayout();
    // Redirect to /ru if language is ru and path is /
    const lang = this.browserStorageService.getItem('language');
    this.updateFavicon(lang);
    if (lang === 'ru' && this.windowService.pathname === '/') {
      this.windowService.replace('/ru');
    }
  }

  reloadLayout() {
    this.isAlive = false;
    setTimeout(() => this.isAlive = true, 1);
  }

  addCanonicalLink(url: string): void {
      if(this.document.querySelectorAll("link[rel='canonical']").length === 0){
        const link: HTMLLinkElement = this.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', url);
        this.document.head.appendChild(link);
      }
  };

  updateFavicon(lang: string | null) {
    const favicon = this.document.getElementById('app-favicon') as HTMLLinkElement;
    if (favicon) {
      const cacheBuster = `?v=${new Date().getTime()}`;
      if(lang === 'ru'){
        favicon.href = 'faviconru.ico'+cacheBuster;
      } else {
        favicon.href = 'favicon.ico'+cacheBuster;
      }
    }
  }
}
