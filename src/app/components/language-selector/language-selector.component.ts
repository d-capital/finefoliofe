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
    localStorage.setItem('language', this.selectedValue);
    localStorage.setItem('isUserLangSet', 'yes');
    let currentUrl = this.router.url;
    if (this.selectedValue === 'ru') {
      // If not already in /ru, add /ru
      if (!currentUrl.startsWith('/ru')) {
        if (currentUrl === '/' || currentUrl === '') {
          this.router.navigate(['/ru']);
        } else {
          this.router.navigate(['/ru' + currentUrl]);
        }
      }
    } else {
      // Remove /ru if present
      if (currentUrl.startsWith('/ru')) {
        const newUrl = currentUrl.replace(/^\/ru/, '') || '/';
        this.router.navigate([newUrl]);
      } else {
        this.router.navigate(['/']);
      }
    }
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
