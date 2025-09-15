import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

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

  ngOnInit(): void {
    const lang = localStorage.getItem('language');
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
