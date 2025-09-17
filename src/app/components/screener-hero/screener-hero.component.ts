import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-screener-hero',
  imports: [RouterModule],
  templateUrl: './screener-hero.component.html',
  styleUrl: './screener-hero.component.css'
})
export class ScreenerHeroComponent implements OnInit {
  title = "";
  subtitle = "";
  button = "";

  ngOnInit(): void {
    const lang = localStorage.getItem('language');
    if (lang === 'ru') {
      this.title = "Скринер акций";
      this.subtitle = "Находите недооцененные компании по модели Питера Линча.";
      this.button = "Начать скрининг";
    } else {
      this.title = "Stock Screener";
      this.subtitle = "Discover undervalued companies with the Peter Lynch model.";
      this.button = "Start Screening";
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
