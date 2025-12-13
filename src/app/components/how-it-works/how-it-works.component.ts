import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Step } from '../../dto/step/step.model';

interface Quote {
  text: string;
  author: string;
  authorSubtitle: string;
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
        { number: 1, title: "Введите тикер акции", description: "Достаточно заполнить поле с тикером акции. Какие-либо другие данные вводить не потребуется." },
        { number: 2, title: "Автоматический расчет", description: "Справедливая стоимость акции, все необходимые значения коэффициентов, результат оценки насколько акция переоценена или недооценена, какой у нее потенциал роста или снижения будут вычислены автоматически на основании достоверных данных." }
      ];
      this.quote = {
        text: "Инвестирование без исследований подобно игре в стад-покер, не глядя в карты.",
        author: "Питер Линч",
        authorSubtitle: "Управляющий инвестиционным фондом Fidelity Magellan в 1977-1990"
      };
    } else {
      this.title = "How It Works";
      this.steps = [
        { number: 1, title: "Enter stock ticker", description: "Simply fill in the stock ticker field. No other information is required." },
        { number: 2, title: "Automated calculation", description: "The fair value of a share, all necessary coefficient values, the result of the assessment of how much a share is overvalued or undervalued, what is its potential for growth or decline will be calculated automatically based on reliable data." },      ];
      this.quote = {
        text: "Investing without research is like playing stud poker without looking at the cards.",
        author: "Peter Lynch",
        authorSubtitle:"Fidelity Magellan Investment Fund Manager in 1977-1990"
      };
    }
  }
}
