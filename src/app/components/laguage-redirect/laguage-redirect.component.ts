import { Component, OnInit,Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-laguage-redirect',
  imports: [],
  templateUrl: './laguage-redirect.component.html',
  styleUrl: './laguage-redirect.component.css'
})
@Injectable({ providedIn: 'root' })
export class LanguageRedirectComponent implements OnInit {

  constructor(private router: Router, @Inject(DOCUMENT) private document: Document) {}
  
  ngOnInit(): void {
    const savedLang = localStorage.getItem('language');
    const supportedLangs = ['en', 'ru'];

    const lang = supportedLangs.includes(savedLang ?? '')
      ? savedLang
      : 'en';
    var reLang = lang ?? 'en';   
    this.router.navigate([`/${lang}`], { replaceUrl: true });
    if(reLang == 'ru'){
      this.addCanonicalLink('https://valestor.com/')
    }
    if(reLang == 'en'){
      this.addCanonicalLink('https://valestor.com/')
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