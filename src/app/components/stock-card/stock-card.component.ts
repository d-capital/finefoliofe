import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-stock-card',
  imports: [CommonModule],
  templateUrl: './stock-card.component.html',
  styleUrl: './stock-card.component.css'
})
export class StockCardComponent {

  @Input() value: number = 0;              // e.g. 25 or -15
  @Input() label: string = '';             // text under percent
  @Input() color: 'green' | 'red' = 'green';

  get arrow(): string {
    return this.color === 'green' ? '↑' : '↓';
  }

   formatValue(value:number): string {
    if (this.value !== null){
      var val = (this.value).toFixed(2)
      if (value > 0){
        return "+"+ val + "%";
      }else{
        return val + "%";
      }
    }
    else{
      return "-"
    }
  }

}
