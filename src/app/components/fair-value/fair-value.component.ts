import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-fair-value',
  imports: [],
  templateUrl: './fair-value.component.html',
  styleUrl: './fair-value.component.css'
})
export class FairValueComponent implements OnInit {
  title = "";
  formula = "";
  explanation = "";
  screenshot = "screenshot2.png";
  ngOnInit(): void {
    const lang = localStorage.getItem("language");
    if (lang === "ru") {
      this.title = "Как мы считаем справедливую стоимость";
      this.formula = "Справедливая цена = EPS × Средний рост чистой прибыли за 5 лет";
      this.explanation = "Мы используем модель Питера Линча для оценки акций. Она помогает определить, недооценена или переоценена акция.";
    } else {
      this.title = "How We Calculate Fair Value";
      this.formula = "Fair Price = EPS × 5 Year Average Net Income Growth Rate";
      this.explanation = "We use Peter Lynch's valuation model to estimate fair value and determine if a stock is undervalued or overvalued.";
    }
  }
}
