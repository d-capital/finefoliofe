import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { StockCardComponent } from '../stock-card/stock-card.component';

interface Example {
  company: string;
  ticker: string;
  upside: number;
  status: string;
  link: string;
}

@Component({
  selector: 'app-examples',
  imports: [NgFor, StockCardComponent],
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css']
})
export class ExamplesComponent implements OnInit {
  title = "";
  subtitle = "";
  examples: Example[] = [];

  ngOnInit(): void {
    const lang = localStorage.getItem("language");

    if (lang === "ru") {
      this.title = "Примеры";
      this.subtitle = "Изучите нашу коллекцию идей.";
      this.examples = [
        { company: "Cбербанк", ticker: "SBER", upside: 506, status: "Undervalued", link: "/valuate/MOEX/SBER"},
        { company: "Мать и Дитя", ticker: "MDMG", upside: 78, status: "Undervalued", link: "/valuate/MOEX/MDMG" },
        { company: "ИНАРКТИКА", ticker: "AQUA", upside: 499, status: "Undervalued", link: "/valuate/MOEX/AQUA" },
        { company: "X5", ticker: "X5", upside: 293, status: "Undervalued", link: "/valuate/MOEX/X5" }
      ];
    } else {
      this.title = "Examples";
      this.subtitle = "Explore our collection of ideas.";
      this.examples = [
        { company: "Pfizer, Inc.", ticker: "PFE", upside: 68, status: "Undervalued", link: "/valuate/NYSE/PFE"},
        { company: "Block, Inc.", ticker: "XYZ", upside: 93, status: "Undervalued", link: "/valuate/NYSE/XYZ" },
        { company: "Novo Nordisk", ticker: "NVO", upside: 6, status: "Undervalued", link: "/valuate/NYSE/NVO" },
        { company: "Coca-Cola", ticker: "COKE", upside: 16, status: "Undervalued", link: "/valuate/NASDAQ/COKE" }
      ];
    }
  }
}
