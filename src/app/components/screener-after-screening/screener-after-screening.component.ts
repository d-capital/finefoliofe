import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Step } from '../../dto/step/step.model';
import { BrowserStorageService } from '../../services/browser-storage.service';

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

  constructor(private browserStorageService: BrowserStorageService) {}

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem('language');
    if (lang === 'ru') {
      this.title = "Что делать после оценки";
      this.steps = [
        { number: 1, title: "Проведи собственное исследование", description: "\"Всегда делайте домашнее задание\", говорил Питер Линч. Проведи самостоятельное исследование. Он утверждал, что достаточно двух часов для исследования каждой компании. Например, целесообразно понять есть ли у компании \"ров\" на рынке перед конкурентами в своей отрасли, причины роста прибыли, устойчивость или нестабильность роста прибыли, уровень долга, размер дивидендов и денежного потока, долю институциональных инвесторов и покупают ли акции инсайдеры." },
        { number: 2, title: "Узнай оценку справедливой стоимости с помощью других методов оценки", description: "Примени другие методы оценки справедливой стоимости, например дисконтирование денежных потоков (DCF, Discounted Cash Flow) и сравнительный анализ (Relative analysis)." },
      ];
    } 
    else if(lang === 'es'){
      this.title = "Qué Hacer Después de la Valoración";
      this.steps = [
        { number: 1, title: "Haz tu propia investigación", description: "\"Haz siempre tus deberes.\", dijo Peter Lynch. Investiga por tu cuenta. Afirmó que dos horas son suficientes para investigar cada empresa. Por ejemplo, es útil comprender si la empresa tiene una ventaja competitiva sólida frente a sus competidores en el sector, las razones del crecimiento de sus beneficios, la sostenibilidad o inestabilidad de dicho crecimiento, el nivel de deuda, el tamaño de los dividendos y el flujo de caja, la proporción de inversores institucionales y si los directivos están comprando acciones."},
        { number: 2, title: "Calcular el valor razonable mediante diferentes metodologías de valoración.", description: "Considere otras formas de determinar el valor razonable, como el flujo de caja descontado (DCF, Discounted Cash Flow) y el análisis relativo." },
      ];
    }
    else {
      this.title = "What to Do After Valuation";
      this.steps = [
        { number: 1, title: "Do your own research", description: "\"Always do your homework\", said Peter Lynch. Conduct your own research. He claimed that two hours is enough to research each company. For example, it's helpful to understand whether the company has a market moat compared to competitors in its industry, the reasons for its profit growth, the sustainability or instability of profit growth, the level of debt, the size of dividends and cash flow, the proportion of institutional investors, and whether insiders are buying shares."},
        { number: 2, title: "Calculate the fair value through different valuation methodologies", description: "Consider other ways to determine the fair value, such as discounted cash flow (DCF), relative analysis." },
      ];
    }
  }
}
