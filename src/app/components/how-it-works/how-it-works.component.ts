import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Step } from '../../dto/step/step.model';

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
        { number: 1, title: "Введите тикер акции", description: "Достаточно заполнить поле с тикером акции. Какие-либо другие данные вводить не потребуется." },
        { number: 2, title: "Автоматический расчет", description: "Справедливая стоимость акции будет вычислена автоматически на основании достоверных данных." },
        { number: 3, title: "Посмотри справедливую стоимость", description: "Ты увидишь конкретный наглядный результат оценки насколько акция переоценена или недооценена." }
      ];
      this.quote = {
        text: "Инвестирование без исследований подобно игре в стад-покер, не глядя в карты.",
        author: "Питер Линч"
      };
    } else {
      this.title = "How It Works";
      this.steps = [
        { number: 1, title: "Enter stock ticker", description: "Simply fill in the stock ticker field. No other information is required." },
        { number: 2, title: "Automated calculation", description: "The fair value of the share will be calculated automatically based on reliable data." },
        { number: 3, title: "Check the fair value", description: "You will see a concrete visual result of the assessment of how much the stock is overvalued or undervalued." }
      ];
      this.quote = {
        text: "Investing without research is like playing stud poker without looking at the cards.",
        author: "Peter Lynch"
      };
    }
  }
}
