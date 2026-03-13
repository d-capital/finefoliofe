import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-screener-how-it-works',
  imports: [NgFor],
  templateUrl: './screener-how-it-works.component.html',
  styleUrl: './screener-how-it-works.component.css'
})
export class ScreenerHowItWorksComponent implements OnInit {
  title = '';
  subtitle = '';
  steps: string[] = [];

  constructor(private browserStorageService: BrowserStorageService) {}

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem('language');
    if (lang === 'ru') {
      this.title = "Как это работает";
      this.subtitle = "Простой процесс в несколько шагов:";
      this.steps = [
        "Введите фильтры и условия",
        "Получите список акций",
        "Сравните результаты и выберите"
      ];
    } else {
      this.title = "How It Works";
      this.subtitle = "A simple 3-step process:";
      this.steps = [
        "Set your filters and conditions",
        "Get a list of stocks",
        "Compare results and choose"
      ];
    }
  }
}
