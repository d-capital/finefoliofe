import { Component } from '@angular/core';
import { ArticlelistComponent } from '../../components/articlelist/articlelist.component';
import { SearchComponent } from '../../components/search/search.component';

@Component({
  selector: 'app-landing',
  imports: [ArticlelistComponent, SearchComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
