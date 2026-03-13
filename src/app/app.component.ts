import { Component, OnInit, Injectable, Inject} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DOCUMENT } from '@angular/common';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  standalone: true
})
@Injectable({ providedIn: 'root' })
export class AppComponent implements OnInit {
  title = 'finefolio-fe';
  isAlive:boolean = false;
  constructor(private route:ActivatedRoute, @Inject(DOCUMENT) private document: Document
  ) {
    this.syncLanguageWithUrl();
    // Listen for navigation events to keep language in sync
    window.addEventListener('popstate', () => this.syncLanguageWithUrl());
  }

  syncLanguageWithUrl() {
    const pathSegment = window.location.pathname.split('/')[1];
    const isUserLangSet = localStorage.getItem('isUserLangSet');
    if (isUserLangSet !== 'yes') {
      if (pathSegment === 'ru') {
        localStorage.setItem('language', 'ru');
        localStorage.setItem('isUserLangSet', 'yes');
      } else {
        localStorage.setItem('language', 'en');
        localStorage.setItem('isUserLangSet', 'yes');
      }
    }
  }
  ngOnInit(): void {
    this.reloadLayout();
    // Redirect to /ru if language is ru and path is /
    const lang = localStorage.getItem('language');
    if (lang ==='ru'){
      this.addCanonicalLink('https://valestor.com/ru');
    } else{
      this.addCanonicalLink('https://valestor.com/');
    }
    if (lang === 'ru' && window.location.pathname === '/') {
      window.location.replace('/ru');
    }
  }

  reloadLayout() {
    this.isAlive = false;
    setTimeout(() => this.isAlive = true, 1);
  }

  addCanonicalLink(url: string): void {
      if(document.querySelectorAll("link[rel='canonical']").length === 0){
        const link: HTMLLinkElement = this.document.createElement('link');
        link.setAttribute('rel', 'canonical');
        link.setAttribute('href', url);
        this.document.head.appendChild(link);
      }
  };
}
