import { Component, OnInit } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { MacrosearchComponent } from '../../components/macrosearch/macrosearch.component';
import { EconomiescomparisonComponent } from '../../components/economiescomparison/economiescomparison.component';
import { NewsComponent } from '../../components/news/news.component';


@Component({
  selector: 'app-landing',
  imports: [SearchComponent, MacrosearchComponent, EconomiescomparisonComponent, NewsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
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
    }
    else{
      this.erSearchText = this.erSearchTextEn;
      this.historySearchText = this.historySearchTextEn;
    }
  }
}
