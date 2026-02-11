import { Component, OnInit } from '@angular/core';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { FairValueComponent } from '../../components/fair-value/fair-value.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { ValuationHeroComponent } from '../../components/valuation-hero/valuation-hero.component';
import { ScreenerAfterScreeningComponent } from '../../components/screener-after-screening/screener-after-screening.component';
import { Title, Meta } from '@angular/platform-browser';
import { ExamplesComponent } from '../../components/examples/examples.component';


@Component({
  selector: 'app-landing',
  imports: [
    ValuationHeroComponent,
    HowItWorksComponent,
    FairValueComponent,
    FaqComponent,
    ScreenerAfterScreeningComponent, 
    ExamplesComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
   constructor(private titleService: Title, private metaService: Meta) {}

  erSearchTextEn:string = "Side-by-Side Currency Comparison:";
  erSearchTextRu:string = "Сравнение валют"; 
  erSearchText:string = "Side-by-Side Currency Comparison:"

  historySearchTextEn:string = "Historical Data Download:";
  historySearchTextRu:string = "Скачать исторические данные:"; 
  historySearchText:string = "Historical Data Download:"

  ngOnInit(): void {
    var language = localStorage.getItem('language');
    if(language == 'ru'){
      this.erSearchText = this.erSearchTextRu;
      this.historySearchText = this.historySearchTextRu;
      this.titleService.setTitle('Valestor - Метод Питера Линча | Найди недооцененные акции с потенциалом роста для своего инвестиционного портфеля');
      this.metaService.updateTag({
        name: 'description',
        content: 'Перед тем как покупать или продавать акцию узнай справедливую стоимость, оценку недооцененности или переоцененности, потенциал роста или снижения по методу Питера Линча'
      });
    }
    else{
      this.erSearchText = this.erSearchTextEn;
      this.historySearchText = this.historySearchTextEn;
      this.titleService.setTitle('Valestor - The Peter Lynch Method | Find Undervalued Stocks with Growth Potential for Your Portfolio');
      this.metaService.updateTag({
        name: 'description',
        content: 'Before buying or selling a stock, find out its fair value, undervaluation or overvaluation, and potential for growth or decline using Peter Lynch\'s method.'
      });
    }
  }
}
