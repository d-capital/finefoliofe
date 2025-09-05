import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-why-us',
  imports: [NgFor],
  templateUrl: './why-us.component.html',
  styleUrl: './why-us.component.css'
})
export class WhyUsComponent implements OnInit {
  title = "";
  benefits: string[] = [];

  ngOnInit(): void {
    const lang = localStorage.getItem("language");
    if (lang === "ru") {
      this.title = "Почему мы?";
      this.benefits = [
        "Простая и понятная методология оценки",
        "Данные из надёжных источников",
        "Быстрая и удобная работа с сервисом",
        "Фокус на стоимостном инвестировании"
      ];
    } else {
      this.title = "Why Us?";
      this.benefits = [
        "Simple and transparent valuation model",
        "Data from trusted sources",
        "Fast and user-friendly",
        "Focus on value investing principles"
      ];
    }
  }
}
