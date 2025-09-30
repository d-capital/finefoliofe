import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';

interface Example {
  company: string;
  ticker: string;
  upside: number;
  status: string;
}

@Component({
  selector: 'app-examples',
  imports: [NgFor],
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
    } else {
      this.title = "Examples";
      this.subtitle = "Explore our collection of ideas.";
    }

    // Fake data for now
    this.examples = [
      { company: "Apple Inc", ticker: "AAPL", upside: 15, status: "Недооценена" },
      { company: "Apple Inc", ticker: "AAPL", upside: 15, status: "Недооценена" },
      { company: "Apple Inc", ticker: "AAPL", upside: 15, status: "Недооценена" },
      { company: "Apple Inc", ticker: "AAPL", upside: 15, status: "Недооценена" }
    ];
  }
}
