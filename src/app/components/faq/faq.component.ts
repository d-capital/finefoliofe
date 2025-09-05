import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface FAQ {
  q: string;
  a: string;
  open?: boolean;
}

@Component({
  selector: 'app-faq',
  imports: [NgFor,NgIf],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.css'
})
export class FaqComponent implements OnInit{
  title = "";
  faqs: FAQ[] = [];

  ngOnInit(): void {
    const lang = localStorage.getItem("language");
    if (lang === "ru") {
      this.title = "Часто задаваемые вопросы";
      this.faqs = [
        { q: "Что такое модель Питера Линча?", a: "Это метод оценки акций, учитывающий прибыль и темпы роста." },
        { q: "Откуда берутся данные?", a: "Мы используем публичные финансовые данные из надёжных источников." }
      ];
    } else {
      this.title = "Frequently Asked Questions";
      this.faqs = [
        { q: "What is the Peter Lynch Model?", a: "It’s a stock valuation method that considers earnings and growth." },
        { q: "Where do you get the data?", a: "We use public financial data from trusted sources." }
      ];
    }
  }

  toggle(faq: FAQ) {
    faq.open = !faq.open;
  }
}
