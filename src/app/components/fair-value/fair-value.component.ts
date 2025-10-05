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
          description: "Мы считаем справедливую стоимость по следующей версии формулы Питера Линча. Справедливая стоимость акции по Питеру Линчу = Темп роста прибыли (Earnings Growth Rate) * Базовая прибыль на акцию (EPS) * Цена акции / прибыль на акцию (PEG)."
        },
        {
          image: "eps.png",
          title: "Базовая прибыль на акцию (EPS)",
          subtitle: "EPS",
          description: "Мы применяем коэффициент Базовая прибыль на акцию за последние 12 месяцев (EPS TTM, Earnings per share Trailing Twelve Months) в формуле Питера Линча."
        },
        {
          image: "growth.png",
          title: "Темп роста прибыли",
          subtitle: "—",
          description: "Темп роста прибыли формуле - это совокупный среднегодовой темп роста (CAGR, Compound Annual Growth Rate) чистой прибыли (Net Income) за последние 5 лет."
        },
        {
          image: "blog-preview/peg.png",
          title: "Цена акции / прибыль на акцию (PEG)",
          subtitle: "—",
          description: "Для простоты расчета значение коэффициента Цена акции / прибыль на акцию (PEG, Price / Earnings to Growth Ratio) равно 1."
        },
        {
          image: "final.png",
          title: "Финальный результат оценки справедливой стоимости",
          subtitle: "—",
          description: "Мы автоматически высчитываем справедливую стоимость акции, потенциал роста или снижения и делаем оценку недооценена или переоценена акция."
        }
      ];
    } else {
      this.title = "How We Calculate Fair Value";
      this.cards = [
        {
          image: "formula.png",
          title: "Lynch Fair Value Formula",
          subtitle: "—",
          description: "We calculate fair value using the following version of Peter Lynch's formula. Peter Lynch's fair value per share = Earnings Growth Rate * Basic Earnings per Share (EPS) * Share Price / Earnings per Share (PEG)."
        },
        {
          image: "eps.png",
          title: "Basic earnings per share, EPS",
          subtitle: "EPS",
          description: "Мы применяем коэффициент Базовая прибыль на акцию за последние 12 месяцев (EPS TTM, Earnings per share Trailing Twelve Months) в формуле Питера Линча."
        },
        {
          image: "growth.png",
          title: "Earnings Growth Rate",
          subtitle: "—",
          description: "The profit growth rate formula is the compound annual growth rate (CAGR) of net income over the past 5 years."
        },
        {
          image: "blog-preview/peg.png",
          title: "Stock price / EPS (PEG)",
          subtitle: "—",
          description: "For ease of calculation, the Price/Earnings to Growth Ratio (PEG) is equal to 1."
        },
        {
          image: "final.png",
          title: "Final result of fair value calculation",
          subtitle: "—",
          description: "We automatically calculate the fair value of a share, its potential for growth or decline, and assess whether the share is undervalued or overvalued."
        }
      ];
    }
  }
}
