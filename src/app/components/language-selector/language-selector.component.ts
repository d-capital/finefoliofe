import { NgFor, NgIf } from '@angular/common';
import { Component, Input, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-selector',
  imports: [NgFor, NgIf],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {

  constructor(private router: Router) {}
  @Output() close = new EventEmitter<void>();
  @Input() selectedValue!: string | undefined; 
  isDropdownOpen = false;
  hoveredLang: string | null = null;
  languages = [
    { code: 'ru', label: 'Русский' },
    { code: 'en', label: 'English' }
  ];

  onSelectionChange(newValue: string) {
    this.selectedValue = newValue;
    console.log('Selected value:', this.selectedValue);
    localStorage.setItem('language', this.selectedValue);
    localStorage.setItem('isUserLangSet', 'yes');
    console.log(this.router.url);
    const url = `/${this.selectedValue}`+this.router.url.substring(3);
    this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
      this.router.navigate([url]);
    });
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
  
  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.language-selector')) {
      this.closeDropdown();
    }
  }
}
