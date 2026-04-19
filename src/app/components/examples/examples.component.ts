import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { StockCardComponent } from '../stock-card/stock-card.component';
import { BrowserStorageService } from '../../services/browser-storage.service';

interface Example {
  company: string;
  ticker: string;
  upside: number;
  status: string;
  cardStatus:string;
  link: string;
}

@Component({
  selector: 'app-examples',
  imports: [NgFor, StockCardComponent, NgIf],
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.css']
})
export class ExamplesComponent implements OnInit {
  title = "";
  subtitle = "";
  examples: Example[] = [];
  error: boolean = false;
  loading: boolean = false;

  constructor(
    private browserStorageService: BrowserStorageService,
  ) { }

  ngOnInit(): void {
    this.loading = false;
    const lang = this.browserStorageService.getItem("language");
    if (lang === "ru") {
      this.title = "Примеры";
      this.subtitle = "Изучите нашу коллекцию идей.";
    } else {
      this.title = "Examples";
      this.subtitle = "Explore our collection of ideas.";
    }

    if (lang === "ru") {
      this.examples = [
        { company: "Walt Disney Company", ticker: "DIS", upside: 60, status: "Потенциал роста", cardStatus: "Недооценена", link: "/ru/stocks/nyse-dis/peter-lynch-fair-value-calculator" },
        { company: "Vital Farms, Inc.", ticker: "VITL", upside: 202, status: "Потенциал роста", cardStatus: "Недооценена", link: "/ru/stocks/nasdaq-vitl/peter-lynch-fair-value-calculator" },
        { company: "Novo Nordisk", ticker: "NVO", upside: 31, status: "Потенциал роста", cardStatus: "Недооценена", link: "/ru/stocks/nyse-nvo/peter-lynch-fair-value-calculator" },
        { company: "Dr. Reddy's Laboratories Ltd", ticker: "RDY", upside: 38, status: "Потенциал роста", cardStatus: "Недооценена", link: "/ru/stocks/nyse-rdy/peter-lynch-fair-value-calculator" }
      ];
    } else {
      this.examples = [
        { company: "Walt Disney Company", ticker: "DIS", upside: 60, status: "Upside potential", cardStatus: "Undervalued", link: "/stocks/nyse-dis/peter-lynch-fair-value-calculator" },
        { company: "Vital Farms, Inc.", ticker: "VITL", upside: 202, status: "Upside potential", cardStatus: "Undervalued", link: "/stocks/nasdaq-vitl/peter-lynch-fair-value-calculator" },
        { company: "Novo Nordisk", ticker: "NVO", upside: 31, status: "Upside potential", cardStatus: "Undervalued", link: "/stocks/nyse-nvo/peter-lynch-fair-value-calculator" },
        { company: "Dr. Reddy's Laboratories Ltd", ticker: "RDY", upside: 38, status: "Upside potential", cardStatus: "Undervalued", link: "/stocks/nyse-rdy/peter-lynch-fair-value-calculator" }
      ];
    }
  }
}
