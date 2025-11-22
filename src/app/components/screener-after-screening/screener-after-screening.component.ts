import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Step } from '../../dto/step/step.model';

@Component({
  selector: 'app-screener-after-screening',
  imports: [NgFor],
  templateUrl: './screener-after-screening.component.html',
  styleUrl: './screener-after-screening.component.css'
})
export class ScreenerAfterScreeningComponent implements OnInit{
  title = '';
  subtitle = '';
  steps: Step[] = [];

  ngOnInit(): void {
    const lang = localStorage.getItem('language');
    if (lang === 'ru') {
      this.title = "Что делать после оценки";
      this.steps = [
        { number: 1, title: "Проведи собственное исследование", description: "\"Всегда делайте домашнее задание\", говорил Питер Линч. Проведи самостоятельное исследование. Он утверждал, что достаточно двух часов для исследования каждой компании. Например, целесообразно понять есть ли у компании \"ров\" на рынке перед конкурентами в своей отрасли, причины роста прибыли, устойчивость или нестабильность роста прибыли, долю институциональных инвесторов и покупают ли акции инсайдеры." },
        { number: 2, title: "Узнай оценку справедливой стоимости с помощью других методов оценки", description: "Примени другие методы оценки справедливой стоимости, например дисконтирование денежных потоков (DCF, Discounted Cash Flow) и сравнительный анализ (Relative analysis)" },
      ];
    } else {
      this.title = "What to Do After Screening";
      this.steps = [
        { number: 1, title: "Do your own research", description: "\"Always do your homework\", said Peter Lynch. Conduct your own research. He claimed that two hours is enough to research each company. For example, it's helpful to understand whether the company has a market moat compared to competitors in its industry, the reasons for profit growth, the sustainability or instability of profit growth, the share of institutional investors, and whether insiders are buying shares."},
        { number: 2, title: "Find out the fair value estimate using other valuation methods", description: "Apply other methods of estimating fair value, such as discounted cash flow (DCF) and relative analysis." },
      ];
    }
  }
}
