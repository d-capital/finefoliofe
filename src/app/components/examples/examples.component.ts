import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { StockCardComponent } from '../stock-card/stock-card.component';
import { BrowserStorageService } from '../../services/browser-storage.service';

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

  constructor(private browserStorageService: BrowserStorageService) {}

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem("language");

    if (lang === "ru") {
      this.title = "Примеры";
      this.subtitle = "Изучите нашу коллекцию идей.";
      this.examples = [
        { company: "Pfizer, Inc.", ticker: "PFE", upside: 68, status: "Недооценена", link: "/ru/stocks/nyse-pfe/peter-lynch-fair-value-calculator"},
        { company: "Block, Inc.", ticker: "XYZ", upside: 93, status: "Недооценена", link: "/ru/stocks/nyse-xyz/peter-lynch-fair-value-calculator" },
        { company: "Novo Nordisk", ticker: "NVO", upside: 6, status: "Недооценена", link: "/ru/stocks/nyse-nvo/peter-lynch-fair-value-calculator" },
        { company: "Coca-Cola", ticker: "COKE", upside: 16, status: "Недооценена", link: "/ru/stocks/nyse-coke/peter-lynch-fair-value-calculator" }
      ];
    } else {
      this.title = "Examples";
      this.subtitle = "Explore our collection of ideas.";
      this.examples = [
        { company: "Pfizer, Inc.", ticker: "PFE", upside: 68, status: "Undervalued", link: "/stocks/nyse-pfe/peter-lynch-fair-value-calculator"},
        { company: "Block, Inc.", ticker: "XYZ", upside: 93, status: "Undervalued", link: "/stocks/nyse-xyz/peter-lynch-fair-value-calculator" },
        { company: "Novo Nordisk", ticker: "NVO", upside: 6, status: "Undervalued", link: "/stocks/nyse-nvo/peter-lynch-fair-value-calculator" },
        { company: "Coca-Cola", ticker: "COKE", upside: 16, status: "Undervalued", link: "/stocks/nyse-coke/peter-lynch-fair-value-calculator" }
      ];
    }
  }
}
