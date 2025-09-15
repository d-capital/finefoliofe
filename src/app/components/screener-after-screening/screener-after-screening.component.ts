import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-screener-after-screening',
  imports: [],
  templateUrl: './screener-after-screening.component.html',
  styleUrl: './screener-after-screening.component.css'
})
export class ScreenerAfterScreeningComponent implements OnInit{
  title = '';
  subtitle = '';

  ngOnInit(): void {
    const lang = localStorage.getItem('language');
    if (lang === 'ru') {
      this.title = "Что делать после оценки";
      this.subtitle = "Используйте результаты для выбора долгосрочных инвестиций.";
    } else {
      this.title = "What to Do After Screening";
      this.subtitle = "Use the results to select your long-term investments.";
    }
  }
}
