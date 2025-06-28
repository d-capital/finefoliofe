import { Component } from '@angular/core';
import { SearchComponent } from '../../components/search/search.component';
import { MacrosearchComponent } from '../../components/macrosearch/macrosearch.component';

@Component({
  selector: 'app-landing',
  imports: [SearchComponent, MacrosearchComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
