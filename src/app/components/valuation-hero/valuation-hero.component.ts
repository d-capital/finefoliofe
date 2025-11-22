import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';

@Component({
  selector: 'app-valuation-hero',
  imports: [RouterModule, SearchComponent],
  templateUrl: './valuation-hero.component.html',
  styleUrl: './valuation-hero.component.css'
})
export class ValuationHeroComponent implements OnInit {
  title:string = "Peter Lynch Method";
  subtitle:string = "Invest like Peter Lynch. Find out the fair value of a stock using Peter Lynch's formula. Before buying or selling a stock, find out whether it's undervalued or overvalued to make smart investment decisions.";

  titleRu: string = "Метод Питера Линча";
  subtitleRu: string = "Инвестируй как Питер Линч. Узнай справедливую стоимость акции по формуле Питера Линча. Перед тем как покупать или продавать акцию, выясни она недооценена или переоценена, чтобы принимать разумные инвестиционные решения";
  
  titleEn: string = "Peter Lynch Method";
  subtitleEn: string = "Invest like Peter Lynch. Find out the fair value of a stock using Peter Lynch's formula. Before buying or selling a stock, find out whether it's undervalued or overvalued to make smart investment decisions.";


  ngOnInit(): void {
    var language = localStorage.getItem('language');
    if(language == 'ru'){
      this.title = this.titleRu;
      this.subtitle = this.subtitleRu;

    }
    else{
      this.title = this.titleEn;
      this.subtitle = this.subtitleEn;

    }
  }
}
