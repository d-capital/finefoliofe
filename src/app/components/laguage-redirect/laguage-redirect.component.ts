import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-laguage-redirect',
  imports: [],
  templateUrl: './laguage-redirect.component.html',
  styleUrl: './laguage-redirect.component.css'
})
export class LanguageRedirectComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit(): void {
    const savedLang = localStorage.getItem('language');
    const supportedLangs = ['en', 'ru'];

    const lang = supportedLangs.includes(savedLang ?? '')
      ? savedLang
      : 'en';

    this.router.navigate([`/${lang}`], { replaceUrl: true });
  }
}