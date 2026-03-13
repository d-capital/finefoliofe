import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-screener-why-us',
  imports: [NgFor],
  templateUrl: './screener-why-us.component.html',
  styleUrl: './screener-why-us.component.css'
})
export class ScreenerWhyUsComponent implements OnInit {
  title = '';
  benefits: { icon: string, text: string }[] = [];

  constructor(private browserStorageService: BrowserStorageService) {}

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem('language');
    if (lang === 'ru') {
      this.title = "Почему мы";
      this.benefits = [
        { icon: "⚡", text: "Быстрый скрининг" },
        { icon: "📊", text: "Прозрачные формулы" },
        { icon: "🌍", text: "Международный охват" }
      ];
    } else {
      this.title = "Why Us";
      this.benefits = [
        { icon: "⚡", text: "Fast Screening" },
        { icon: "📊", text: "Transparent Formulas" },
        { icon: "🌍", text: "Global Coverage" }
      ];
    }
  }
}
