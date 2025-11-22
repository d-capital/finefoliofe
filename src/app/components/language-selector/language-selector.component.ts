import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-language-selector',
  imports: [NgFor],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {
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
    window.location.reload();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}
