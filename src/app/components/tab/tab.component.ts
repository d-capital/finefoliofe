import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tab',
  imports: [],
  templateUrl: './tab.component.html',
  styleUrl: './tab.component.css'
})
export class TabComponent{
  @Input() title!: string;
  @Input() active = false;
  @Input() name: string = 'default';

}
