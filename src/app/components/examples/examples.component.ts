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
        { company: "Pfizer, Inc.", ticker: "PFE", upside: 68, status: "Недооценена", link: "/securities/NYSE-PFE"},
        { company: "Block, Inc.", ticker: "XYZ", upside: 93, status: "Недооценена", link: "/securities/NYSE-XYZ" },
        { company: "Novo Nordisk", ticker: "NVO", upside: 6, status: "Недооценена", link: "/securities/NYSE-NVO" },
        { company: "Coca-Cola", ticker: "COKE", upside: 16, status: "Недооценена", link: "/securities/NASDAQ-COKE" }
      ];
    } else {
      this.title = "Examples";
      this.subtitle = "Explore our collection of ideas.";
      this.examples = [
        { company: "Pfizer, Inc.", ticker: "PFE", upside: 68, status: "Undervalued", link: "/securities/NYSE-PFE"},
        { company: "Block, Inc.", ticker: "XYZ", upside: 93, status: "Undervalued", link: "/securities/NYSE-XYZ" },
        { company: "Novo Nordisk", ticker: "NVO", upside: 6, status: "Undervalued", link: "/securities/NYSE-NVO" },
        { company: "Coca-Cola", ticker: "COKE", upside: 16, status: "Undervalued", link: "/securities/NASDAQ-COKE" }
      ];
    }
  }
}
