import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';


@Component({
  selector: 'app-landing',
  imports: [HeroComponent],
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
