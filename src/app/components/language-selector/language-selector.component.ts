import { NgFor, NgIf } from '@angular/common';
import { Component, Input, EventEmitter, HostListener, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-language-selector',
  imports: [NgFor, NgIf],
  templateUrl: './language-selector.component.html',
  styleUrl: './language-selector.component.css'
})
export class LanguageSelectorComponent {

  constructor(
    private router: Router,
    private browserStorageService: BrowserStorageService
  ) {}
  @Output() close = new EventEmitter<void>();
  @Output() languageChange = new EventEmitter<string>();
  @Input() selectedValue!: string | undefined; 
  isDropdownOpen = false;
  hoveredLang: string | null = null;
  languages = [
    { code: 'ru', label: 'Русский' },
    { code: 'es', label: 'Español' },
    { code: 'en', label: 'English' }
  ];

  onSelectionChange(newValue: string) {
    this.selectedValue = newValue;
    this.browserStorageService.setItem('language', this.selectedValue);
    this.browserStorageService.setItem('isUserLangSet', 'yes');
    // notify parent components about change
    this.languageChange.emit(this.selectedValue);
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
    } 
    else if (this.selectedValue === 'es') {
      // If not already in /es, add /es
      if (!currentUrl.startsWith('/es')) {
        if (currentUrl === '/' || currentUrl === '') {
          this.router.navigate(['/es']);
        } else {
          this.router.navigate(['/es' + currentUrl]);
        }
      }
    }    
    else {
      // Remove /ru if present
      if (currentUrl.startsWith('/ru')) {
        const newUrl = currentUrl.replace(/^\/ru/, '') || '/';
        this.router.navigate([newUrl]);
      } 
      else if (currentUrl.startsWith('/es')) {
        const newUrl = currentUrl.replace(/^\/es/, '') || '/';
        this.router.navigate([newUrl]);
      }
      else {
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
