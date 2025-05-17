import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
    currencyPairs: string[] = [
      'NZD/JPY',
      'EUR/NZD',
      'GBP/NZD',
      'NZD/CHF',
      'USD/JPY',
      'EUR/USD',
      'GBP/USD',
      'AUD/JPY',
      'USD/CHF',
      'EUR/AUD',
      'GBP/AUD',
      'NZD/CAD',
      'AUD/CHF',
      'CAD/JPY',
      'EUR/CAD',
      'USD/CAD',
      'AUD/NZD',
      'GBP/CAD',
      'CAD/CHF',
      'AUD/CAD',
      'GBP/CHF',
      'CHF/JPY',
      'EUR/CHF',
      'NZD/USD',
      'AUD/USD',
      'GBP/JPY',
      'EUR/JPY',
      'EUR/GBP'
  ];
  filteredPairs: string[] = [...this.currencyPairs];
  searchValue: string = '';
  showDropdown = false;
  selectedIndex: number = -1;

  constructor(private router: Router) { }

  onInputChange(): void {
    this.filteredPairs = this.currencyPairs.filter(pair =>
      pair.toLowerCase().includes(this.searchValue.toLowerCase())
    );
    this.selectedIndex = -1;
    this.showDropdown = true;
  }

  onSelect(pair: string): void {
    this.searchValue = pair;
    this.showDropdown = false;
    this.navigateToPair(pair);
  }

  onEnter(): void {
    if (this.selectedIndex >= 0 && this.selectedIndex < this.filteredPairs.length) {
      this.onSelect(this.filteredPairs[this.selectedIndex]);
    } else {
      this.showDropdown = false;
      this.navigateToPair(this.searchValue);
    }
  }

  private navigateToPair(pair: string): void {
    const ticker = pair.replace('/', '.');
    this.router.navigate(['/exchange', ticker]);
  }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container')) {
      this.showDropdown = false;
    }
  }
  onFocus(): void {
    this.filteredPairs = [...this.currencyPairs];
    this.selectedIndex = -1;
    this.showDropdown = true;
  }

   onKeyDown(event: KeyboardEvent): void {
    if (!this.showDropdown) return;

    if (event.key === 'ArrowDown') {
      console.log('arrowdown')
      this.selectedIndex = (this.selectedIndex + 1) % this.filteredPairs.length;
      console.log(this.filteredPairs.at(this.selectedIndex));
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      console.log('arrowup')
      this.selectedIndex = (this.selectedIndex - 1 + this.filteredPairs.length) % this.filteredPairs.length;
      console.log(this.filteredPairs.at(this.selectedIndex));
      event.preventDefault();
    }
  }
}
