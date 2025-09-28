import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface FairValueCard {
  image: string;
  title: string;
  subtitle: string;
  description: string;
}

@Component({
  selector: 'app-fair-value',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './fair-value.component.html',
  styleUrls: ['./fair-value.component.css']
})
export class FairValueComponent implements OnInit {
  title = "";
  cards: FairValueCard[] = [];

  ngOnInit(): void {
    const lang = localStorage.getItem("language");

    if (lang === "ru") {
      this.title = "Как мы считаем справедливую стоимость";
      this.cards = [
        {
          image: "formula.png",
          title: "Формула справедливой стоимости Линча",
          subtitle: "—",
          description: "Узнайте, как находить лучшие инвестиционные возможности на рынке."
        },
        {
          image: "eps.png",
          title: "Earnings per share, EPS",
          subtitle: "EPS",
          description: "Изучите стратегии, которые помогут вам добиться успеха в инвестициях."
        },
        {
          image: "growth.png",
          title: "Рост прибыли компании",
          subtitle: "—",
          description: "Избегайте распространённых ошибок и улучшайте свои инвестиционные навыки."
        },
        {
          image: "final.png",
          title: "Apple Inc",
          subtitle: "AAPL",
          description: "Финальный расчет справедливой стоимости акции"
        }
      ];
    } else {
      this.title = "How We Calculate Fair Value";
      this.cards = [
        {
          image: "formula.png",
          title: "Lynch Fair Value Formula",
          subtitle: "—",
          description: "Learn how to discover the best investment opportunities in the market."
        },
        {
          image: "eps.png",
          title: "Earnings per share, EPS",
          subtitle: "EPS",
          description: "Explore strategies that help you succeed in investing."
        },
        {
          image: "growth.png",
          title: "Company Profit Growth",
          subtitle: "—",
          description: "Avoid common mistakes and improve your investment skills."
        },
        {
          image: "final.png",
          title: "Apple Inc",
          subtitle: "AAPL",
          description: "Final fair value calculation of the stock."
        }
      ];
    }
  }
}
