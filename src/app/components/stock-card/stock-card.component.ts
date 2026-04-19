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

  get isNA(): boolean {
    return this.value === -100 || this.value === 0;
  }

  get displayColor(): 'green' | 'red' | 'grey' {
    if (this.isNA) {
      return 'grey';
    }
    return this.color;
  }

  get arrow(): string {
    if (this.isNA) {
      return '';
    }
    return this.color === 'green' ? '↑' : '↓';
  }

  get displayValue(): string {
    if (this.isNA) {
      const lang = this.getLanguage();
      return lang === 'ru' ? 'Н/Д' : 'N/A';
    }
    return this.formatValue(this.value);
  }
  get labelText(): string {
    if (this.isNA) {
      return '';
    }
    return this.label;
  }

  private getLanguage(): string {
    // Check localStorage for language preference
    const stored = localStorage.getItem('language');
    if (stored) return stored;
    // Fallback to browser locale
    return navigator.language.startsWith('ru') ? 'ru' : 'en';
  }

   formatValue(value:number): string {
    if (this.value !== null){
      var val = (Math.floor(this.value)).toFixed(0)
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
