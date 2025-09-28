import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface Quote {
  text: string;
  author: string;
}

@Component({
  selector: 'app-how-it-works',
  imports: [NgFor],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent implements OnInit{
  title = "";
  steps: Step[] = [];
  screenshot = "lynch-photo.png"; // replace with real screenshot
  quote!: Quote;

  ngOnInit(): void {
    const lang = localStorage.getItem("language");
    if (lang === "ru") {
      this.title = "Как работает сервис";
      this.steps = [
        { number: 1, title: "Введите тикер акции", description: "Введите уникальный идентификатор акции, чтобы начать." },
        { number: 2, title: "Мы производим расчеты", description: "Наша система анализирует данные и автоматически вычисляет результаты." },
        { number: 3, title: "Получите результаты анализа", description: "Вы получите подробный отчет о состоянии акции." }
      ];
      this.quote = {
        text: "Знайте, чем вы владеете, и знайте, почему вы этим владеете. Возможно, лучшая акция для покупки — та, которой вы уже владеете.",
        author: "Питер Линч"
      };
    } else {
      this.title = "How It Works";
      this.steps = [
        { number: 1, title: "Enter stock ticker", description: "Enter a unique stock identifier to start." },
        { number: 2, title: "We perform calculations", description: "Our system analyzes data and computes results automatically." },
        { number: 3, title: "Get analysis results", description: "You’ll receive a detailed report about the stock status." }
      ];
      this.quote = {
        text: "Know what you own and know why you own it. The best stock to buy may be the one you already own.",
        author: "Peter Lynch"
      };
    }
  }
}
