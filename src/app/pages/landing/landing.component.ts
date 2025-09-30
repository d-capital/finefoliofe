import { Component, OnInit } from '@angular/core';
import { HeroComponent } from '../../components/hero/hero.component';
import { HowItWorksComponent } from '../../components/how-it-works/how-it-works.component';
import { FairValueComponent } from '../../components/fair-value/fair-value.component';
import { BlogPreviewComponent } from '../../components/blog-preview/blog-preview.component';
import { WhyUsComponent } from '../../components/why-us/why-us.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { ExamplesComponent } from '../../components/examples/examples.component';


@Component({
  selector: 'app-landing',
  imports: [
    HeroComponent,
    HowItWorksComponent,
    FairValueComponent,
    BlogPreviewComponent,
    ExamplesComponent,
    FaqComponent
  ],
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
