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
  title:string = "Find Stock For Valuation";
  subtitle:string = "Select a stock in the dropdown below.";

  titleRu: string = "Найди Акцию Для Оценки";
  subtitleRu: string = "Выберите акцию в выпадающем списке ниже.";
  
  titleEn: string = "Find Stock For Valuation";
  subtitleEn: string = "Select a stock in the dropdown below.";


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
