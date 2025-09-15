import { Component } from '@angular/core';
import { ScreenerHeroComponent } from '../../components/screener-hero/screener-hero.component';
import { ScreenerHowItWorksComponent } from '../../components/screener-how-it-works/screener-how-it-works.component';
import { ScreenerAfterScreeningComponent } from '../../components/screener-after-screening/screener-after-screening.component';
import { BlogPreviewComponent } from '../../components/blog-preview/blog-preview.component';
import { ScreenerWhyUsComponent } from '../../components/screener-why-us/screener-why-us.component';
import { FaqComponent } from '../../components/faq/faq.component';
import { ScreenerResultsComponent } from '../../components/screener-results/screener-results.component';

@Component({
  selector: 'app-screener',
  imports: [ScreenerHeroComponent, 
    ScreenerHowItWorksComponent, 
    ScreenerAfterScreeningComponent, 
    BlogPreviewComponent, 
    ScreenerWhyUsComponent, 
    FaqComponent, 
    ScreenerResultsComponent],
  templateUrl: './screener.component.html',
  styleUrl: './screener.component.css'
})
export class ScreenerComponent {

}
