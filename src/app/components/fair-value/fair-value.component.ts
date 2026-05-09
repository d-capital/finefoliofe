import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { StockCardComponent } from '../stock-card/stock-card.component';

interface FairValueCard {
  image: string;
  title: string;
  subtitle: string;
  description: string;
  isFinalResult: boolean;
}

interface Example {
  company: string;
  ticker: string;
  upside: number;
  status: string;
  link: string;
}

@Component({
  selector: 'app-fair-value',
  standalone: true,
  imports: [NgIf, NgFor,StockCardComponent],
  templateUrl: './fair-value.component.html',
  styleUrls: ['./fair-value.component.css']
})
export class FairValueComponent implements OnInit {
  title = "";
  cards: FairValueCard[] = [];
  example:Example = { company: "Novo Nordisk", ticker: "NVO", upside: 132, status: "Upside potential", link: "/stocks/nyse-nvo/peter-lynch-fair-value-calculator" };

  constructor(private browserStorageService: BrowserStorageService) {}

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem("language");

    if (lang === "ru") {
      this.title = "Как мы считаем справедливую стоимость";
      this.example = { company: "Novo Nordisk", ticker: "NVO", upside: 132, status: "Потенциал роста", link: "/ru/stocks/nyse-nvo/peter-lynch-fair-value-calculator" };
      this.cards = [
        {
          image: "formula.png",
          title: "Формула справедливой стоимости Линча",
          subtitle: "—",
          description: "Мы считаем справедливую стоимость по следующей версии формулы Питера Линча. Справедливая стоимость акции по Питеру Линчу = Темп роста прибыли (Net Income Growth Rate) * Прибыль на акцию за последние 12 месяцев (EPS TTM).",
          isFinalResult:false
        },
        {
          image: "eps.png",
          title: "Прибыль на акцию за последние 12 месяцев (EPS TTM)",
          subtitle: "—",
          description: "Мы применяем коэффициент прибыль на акцию за последние 12 месяцев (EPS TTM, Earnings per share Trailing Twelve Months) в формуле Питера Линча.",
          isFinalResult:false
        },
        {
          image: "growth.png",
          title: "Темп роста прибыли",
          subtitle: "—",
          description: "Темп роста прибыли в формуле - это совокупный среднегодовой темп роста (CAGR) чистой прибыли (Net Income) за последние 5 лет.",
          isFinalResult:false
        },/*
        {
          image: "blog-preview/peg.png",
          title: "Цена акции / Прибыль на акцию / Темп роста прибыли (PEG)",
          subtitle: "—",
          description: "Питер Линч популяризировал коэффициент Цена акции / Прибыль на акцию / Темп роста прибыли (PEG, Price / Earnings / Net IncomeGrowth Ratio). С помощью него оценивается насколько акция недооценена или переоценена с учетом прогнозируемого темпа роста прибыли компании.",
          isFinalResult:false
        },*/
        {
          image: "finalru.png",
          title: "Финальный результат оценки справедливой стоимости",
          subtitle: "—",
          description: "Мы автоматически высчитываем справедливую стоимость акции, потенциал роста или снижения и делаем оценку недооценена или переоценена акция.",
          isFinalResult:false
        }
      ];
    } else {
      this.title = "How We Calculate Fair Value";
      this.example = { company: "Novo Nordisk", ticker: "NVO", upside: 132, status: "Upside potential", link: "/stocks/nyse-nvo/peter-lynch-fair-value-calculator" };
      this.cards = [
        {
          image: "formula.png",
          title: "Lynch Fair Value Formula",
          subtitle: "—",
          description: "We calculate fair value using the following version of Peter Lynch's formula. Peter Lynch's fair value per share = Net Income Growth Rate * Earnings per Share Trailing Twelve Month (EPS TTM).",
          isFinalResult:false
        },
        {
          image: "eps.png",
          title: "Earnings per Share, EPS",
          subtitle: "—",
          description: "We use the Earnings per Share Trailing Twelve Months (EPS TTM) ratio in Peter Lynch's formula.",
          isFinalResult:false
        },
        {
          image: "growth.png",
          title: "Earnings Growth Rate",
          subtitle: "—",
          description: "The Earnings Growth Rate formula is Compound Annual Growth Rate (CAGR) of Net Income over the past 5 years.",
          isFinalResult:false
        },/*
        {
          image: "blog-preview/peg.png",
          title: "Price / Earnings / Net Income Growth Rate (PEG)",
          subtitle: "—",
          description: "Peter Lynch popularized the Price / Earnings per Share / Net Income Growth Rate (PEG) ratio. This measure determines whether a stock is currently undervalued or overvalued based on the company's historical Net Income Growth Rate.",
          isFinalResult:false
        },*/
        {
          image: "final.png",
          title: "Final Result of Fair Value Calculation",
          subtitle: "—",
          description: "We automatically calculate the fair value of a share, its potential for growth or decline, and assess whether the share is undervalued or overvalued.",
          isFinalResult:false
        }
      ];
    }
  }
}
