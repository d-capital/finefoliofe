import { Component, Input } from '@angular/core';

export type ValuationTabName = 'peter_lynch_valuation' | 'dcf_valuation' | 'overview';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent{
  @Input() title!: string;
  @Input() active = false;
  @Input() name: ValuationTabName = 'peter_lynch_valuation';

}
