import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-macrosearch',
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './macrosearch.component.html',
  styleUrl: './macrosearch.component.css'
})
export class MacrosearchComponent implements OnInit {
  eventMap = new Map<string, string>();
  countryMap = new Map<string,string>();

  macroEvents: string[] = [
      'Inflation-US',
      'Inflation-UK',
      'Inflation-EU',
      'Inflation-Canada',
      'Inflation-Australia',
      'Inflation-Japan',
      'Inflation-Switzerland',
      'Inflation-New Zeland',
      'Interest Rate-US',
      'Interest Rate-UK',
      'Interest Rate-EU',
      'Interest Rate-Canada',
      'Interest Rate-Australia',
      'Interest Rate-Japan',
      'Interest Rate-Switzerland',
      'Interest Rate-New Zeland',
      'Unemployment Rate-US',
      'Unemployment Rate-UK',
      'Unemployment Rate-EU',
      'Unemployment Rate-Canada',
      'Unemployment Rate-Australia',
      'Unemployment Rate-Japan',
      'Unemployment Rate-Switzerland',
      'Unemployment Rate-New Zeland',
      'GDP Growth Rate-US',
      'GDP Growth Rate-UK',
      'GDP Growth Rate-EU',
      'GDP Growth Rate-Canada',
      'GDP Growth Rate-Australia',
      'GDP Growth Rate-Japan',
      'GDP Growth Rate-Switzerland',
      'GDP Growth Rate-New Zeland',
  ];

  macroEventsRu: string[] = [
      'Инфляция-США',
      'Инфляция-Великобритания',
      'Инфляция-ЕС',
      'Инфляция-Канада',
      'Инфляция-Австралия',
      'Инфляция-Япония',
      'Инфляция-Швейцария',
      'Инфляция-Новая Зеландия',
      'Ставка-США',
      'Ставка-Великобритания',
      'Ставка-ЕС',
      'Ставка-Канада',
      'Ставка-Австралия',
      'Ставка-Япония',
      'Ставка-Швейцария',
      'Ставка-Новая Зеландия',
      'Безработица-США',
      'Безработица-Великобритания',
      'Безработица-ЕС',
      'Безработица-Канада',
      'Безработица-Австралия',
      'Безработица-Япония',
      'Безработица-Швейцария',
      'Безработица-Новая Зеландия',
      'Рост ВВП-США',
      'Рост ВВП-Великобритания',
      'Рост ВВП-ЕС',
      'Рост ВВП-Канада',
      'Рост ВВП-Австралия',
      'Рост ВВП-Япония',
      'Рост ВВП-Швейцария',
      'Рост ВВП-Новая Зеландия',
  ];

  macroEventsEn: string[] = [
      'Inflation-US',
      'Inflation-UK',
      'Inflation-EU',
      'Inflation-Canada',
      'Inflation-Australia',
      'Inflation-Japan',
      'Inflation-Switzerland',
      'Inflation-New Zeland',
      'Interest Rate-US',
      'Interest Rate-UK',
      'Interest Rate-EU',
      'Interest Rate-Canada',
      'Interest Rate-Australia',
      'Interest Rate-Japan',
      'Interest Rate-Switzerland',
      'Interest Rate-New Zeland',
      'Unemployment Rate-US',
      'Unemployment Rate-UK',
      'Unemployment Rate-EU',
      'Unemployment Rate-Canada',
      'Unemployment Rate-Australia',
      'Unemployment Rate-Japan',
      'Unemployment Rate-Switzerland',
      'Unemployment Rate-New Zeland',
      'GDP Growth Rate-US',
      'GDP Growth Rate-UK',
      'GDP Growth Rate-EU',
      'GDP Growth Rate-Canada',
      'GDP Growth Rate-Australia',
      'GDP Growth Rate-Japan',
      'GDP Growth Rate-Switzerland',
      'GDP Growth Rate-New Zeland',
  ];
  filteredEvents: string[] = [...this.macroEvents];
  searchValue: string = '';
  showDropdown = false;
  selectedIndex: number = -1;
  
  //localization
  placeholder: string = "Search macro data...";
  placeholderRu: string = "Введите название показателя...";
  placeholderEn: string = "Search macro data...";

  constructor(private router: Router) {

    var language = localStorage.getItem('language');
    if(language == 'ru'){
      this.eventMap.set("Рост ВВП","gdp");
      this.eventMap.set("Безработица","unemployment");
      this.eventMap.set("Ставка","interestrate");
      this.eventMap.set("Инфляция","inflation");

      this.countryMap.set("США","usd");
      this.countryMap.set("Великобритания","gbp");
      this.countryMap.set("ЕС","eur");
      this.countryMap.set("Япония","jpy");
      this.countryMap.set("Канада","cad");
      this.countryMap.set("Новая Зеландия","nzd");
      this.countryMap.set("Швейцария","chf");
      this.countryMap.set("Австралия","aud");
    }
    else{
      this.eventMap.set("GDP Growth Rate","gdp");
      this.eventMap.set("Unemployment Rate","unemployment");
      this.eventMap.set("Interest Rate","interestrate");
      this.eventMap.set("Inflation","inflation");

      this.countryMap.set("US","usd");
      this.countryMap.set("UK","gbp");
      this.countryMap.set("EU","eur");
      this.countryMap.set("Japan","jpy");
      this.countryMap.set("Canada","cad");
      this.countryMap.set("New Zeland","nzd");
      this.countryMap.set("Swtizerland","chf");
      this.countryMap.set("Australia","aud");
    }

   }

  ngOnInit(): void {
    var language = localStorage.getItem('language');
    if(language == 'ru'){
      this.placeholder = this.placeholderRu;
      this.macroEvents = this.macroEventsRu;
    }
    else{
      this.placeholder = this.placeholderEn;
      this.macroEvents = this.macroEventsEn;
    }
  }
  onInputChange(): void {
    this.filteredEvents = this.macroEvents.filter(event =>
      event.toLowerCase().includes(this.searchValue.toLowerCase())
    );
    this.selectedIndex = -1;
    this.showDropdown = true;
  }

  onSelect(event: string): void {
    this.searchValue = event;
    this.showDropdown = false;
    this.navigateToPair(event);
  }

  onEnter(): void {
    if (this.selectedIndex >= 0 && this.selectedIndex < this.filteredEvents.length) {
      this.onSelect(this.filteredEvents[this.selectedIndex]);
    } else {
      this.showDropdown = false;
      this.navigateToPair(this.searchValue);
    }
  }

  private navigateToPair(event: string): void {
    var eventname = event.split('-')[0];
    var country = event.split('-')[1]
    let eventActualName  = this.eventMap.get(eventname);
    let countryActualName  = this.countryMap.get(country);
    this.router.navigate(['/macrodata', eventActualName, countryActualName]);
   }
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.search-container')) {
      this.showDropdown = false;
    }
  }
  onFocus(): void {
    this.filteredEvents = [...this.macroEvents];
    this.selectedIndex = -1;
    this.showDropdown = true;
  }

   onKeyDown(event: KeyboardEvent): void {
    if (!this.showDropdown) return;

    if (event.key === 'ArrowDown') {
      console.log('arrowdown')
      this.selectedIndex = (this.selectedIndex + 1) % this.filteredEvents.length;
      console.log(this.filteredEvents.at(this.selectedIndex));
      event.preventDefault();
    } else if (event.key === 'ArrowUp') {
      console.log('arrowup')
      this.selectedIndex = (this.selectedIndex - 1 + this.filteredEvents.length) % this.filteredEvents.length;
      console.log(this.filteredEvents.at(this.selectedIndex));
      event.preventDefault();
    }
  }
}
