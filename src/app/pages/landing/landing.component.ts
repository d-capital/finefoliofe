import { Component, OnInit } from '@angular/core';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { FairValueComponent } from '../../components/fair-value/fair-value.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { ValuationHeroComponent } from '../../components/valuation-hero/valuation-hero.component';
import { ScreenerAfterScreeningComponent } from '../../components/screener-after-screening/screener-after-screening.component';
import { Title, Meta } from '@angular/platform-browser';
import { ExamplesComponent } from '../../components/examples/examples.component';
import { ReliableDataComponent } from '../../components/reliable-data/reliable-data.component';
import { BrowserStorageService } from '../../services/browser-storage.service';
import { QuoteSectionComponent } from '../../components/quote-section/quote-section.component';


@Component({
  selector: 'app-landing',
  imports: [
    ValuationHeroComponent,
    HowItWorksComponent,
    FairValueComponent,
    FaqComponent,
    ScreenerAfterScreeningComponent, 
    ExamplesComponent,
    ReliableDataComponent,
    QuoteSectionComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  constructor(
    private titleService: Title, 
    private metaService: Meta,
    private browserStorageService: BrowserStorageService
  ) {}



  erSearchTextEn:string = "Side-by-Side Currency Comparison:";
  erSearchTextRu:string = "Сравнение валют"; 
  erSearchTextEs:string = "Comparación de monedas lado a lado:";
  erSearchText:string = "Side-by-Side Currency Comparison:"

  historySearchTextEn:string = "Historical Data Download:";
  historySearchTextRu:string = "Скачать исторические данные:"; 
  historySearchTextEs:string = "Descarga de datos históricos:";
  historySearchText:string = "Historical Data Download:"

  ngOnInit(): void {
    var language = this.browserStorageService.getItem('language');
    if (language == 'ru') {
      this.erSearchText = this.erSearchTextRu;
      this.historySearchText = this.historySearchTextRu;
      this.titleService.setTitle('Валестор - Метод Питера Линча | Найди недооцененные акции с потенциалом роста для своего инвестиционного портфеля');
      this.metaService.updateTag({
        name: 'description',
        content: 'Перед тем как покупать или продавать акцию узнай справедливую стоимость, оценку недооцененности или переоцененности, потенциал роста или снижения по методу Питера Линча'
      });
    } else if (language == 'es') {
      this.erSearchText = this.erSearchTextEs;
      this.historySearchText = this.historySearchTextEs;
      this.titleService.setTitle('Valestor - Calculadora de valor razonable de Peter Lynch | Valoración automatizada de acciones');
      this.metaService.updateTag({
        name: 'description',
        content: 'Calcule el valor razonable al instante con nuestra herramienta automatizada basada en la fórmula de Peter Lynch.'
      });
    } else {
      this.erSearchText = this.erSearchTextEn;
      this.historySearchText = this.historySearchTextEn;
      this.titleService.setTitle('Peter Lynch Fair Value Calculator: Instant Automated Stock Valuation | Valestor.com');
      this.metaService.updateTag({
        name: 'description',
        content: 'Calculate fair value instantly using our automated Peter Lynch formula tool. Find out if a stock is undervalued or overvalued before you invest. Make smart decisions with our stock valuation calculator.'
      });
    }
  }
}
