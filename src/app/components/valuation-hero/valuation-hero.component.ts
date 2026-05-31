import { Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SearchComponent } from '../search/search.component';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { Labels } from '../../dto/labels/labels.model';

@Component({
  selector: 'app-valuation-hero',
  imports: [RouterModule, SearchComponent],
  templateUrl: './valuation-hero.component.html',
  styleUrl: './valuation-hero.component.css'
})
export class ValuationHeroComponent implements OnInit {

  title:string = "Peter Lynch Fair Value Calculator";
  subtitle:string = "Invest like Peter Lynch. Find out the fair value of a stock using Peter Lynch's formula. Before buying or selling a stock, find out whether it's undervalued or overvalued to make smart investment decisions.";

  titleRu: string = "Метод Питера Линча";
  subtitleRu: string = "Инвестируй, как Питер Линч. Узнай справедливую стоимость акции по формуле Питера Линча. Перед тем как покупать или продавать акцию выясни оценки недооцененности или переоцененности, потенциал роста или снижения, чтобы принимать разумные инвестиционные решения";
  
  titleEs: string = "Calculadora de Valor Justo de Peter Lynch";
  subtitleEs: string = "Invierte como Peter Lynch. Descubre el valor justo de una acción usando su fórmula. Antes de comprar o vender una acción, averigua si está infravalorada o sobrevalorada para tomar decisiones de inversión inteligentes.";

  pageLanguage:string = 'en';

  constructor(private browserStorageService: BrowserStorageService) {}

  ngOnInit(): void {
    var language = this.browserStorageService.getItem('language');
    this.pageLanguage = language ? language : 'en';
    if(language == 'ru'){
      this.title = this.titleRu;
      this.subtitle = this.subtitleRu;
    }
    else if(language == 'es'){
      this.title = this.titleEs;
      this.subtitle = this.subtitleEs;

    }
  }
}
