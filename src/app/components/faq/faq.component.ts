import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

interface FAQ {
  q: string;
  a: string;
  open?: boolean;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
  title = "";
  faqs: FAQ[] = [];

  ngOnInit(): void {
    const lang = localStorage.getItem("language");
    if (lang === "ru") {
      this.title = "Часто задаваемые вопросы";
      this.faqs = [
        {
          q: "Что такое Value Investing?",
          a: "Value Investing — это стратегия инвестирования, основанная на поиске недооцененных акций. ..."
        },
        {
          q: "Как использовать платформу?",
          a: "Вы можете начать, введя тикер компании, которую хотите проанализировать. ..."
        },
        {
          q: "Какие инструменты доступны?",
          a: "Мы предлагаем различные инструменты для анализа акций, включая калькулятор и скринер. ..."
        },
        {
          q: "Какова стоимость использования?",
          a: "Использование нашей платформы может быть бесплатным или с подпиской на дополнительные функции. ..."
        },
        {
          q: "Где найти поддержку?",
          a: "Если у вас есть вопросы, вы можете обратиться в нашу службу поддержки. ..."
        }
      ];
    } else {
      this.title = "Frequently Asked Questions";
      this.faqs = [
        { q: "What is Value Investing?", a: "Value investing is a strategy based on finding undervalued stocks. ..." },
        { q: "How to use the platform?", a: "Start by entering a company ticker you want to analyze. ..." },
        { q: "What tools are available?", a: "We provide calculators and screeners to help find undervalued companies. ..." },
        { q: "What’s the cost?", a: "Our platform can be used for free or with a subscription for extra features. ..." },
        { q: "Where can I get support?", a: "You can contact our support team anytime via the contact form." }
      ];
    }
  }

  toggle(faq: FAQ) {
    faq.open = !faq.open;
  }
}
