import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-how-it-works',
  imports: [NgFor],
  templateUrl: './how-it-works.component.html',
  styleUrl: './how-it-works.component.css'
})
export class HowItWorksComponent implements OnInit{
  title = "";
  steps: string[] = [];
  screenshot = "screenshot1.png"; // replace with real screenshot

  ngOnInit(): void {
    const lang = localStorage.getItem("language");
    if (lang === "ru") {
      this.title = "Как работает сервис";
      this.steps = [
        "Введите тикер акции",
        "Мы загружаем данные",
        "Считаем справедливую стоимость",
        "Вы получаете результат"
      ];
    } else {
      this.title = "How It Works";
      this.steps = [
        "Enter stock ticker",
        "We fetch public data",
        "We calculate fair value",
        "You see the result"
      ];
    }
  }
}
