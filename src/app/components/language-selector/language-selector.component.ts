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

    const currentUrl = this.router.url;
    const normalizedUrl = currentUrl.replace(/^\/ru|^\/es/, '') || '/';
    let targetUrl = '/';

    if (this.selectedValue === 'ru') {
      targetUrl = normalizedUrl === '/' ? '/ru' : '/ru' + normalizedUrl;
    } else if (this.selectedValue === 'es') {
      targetUrl = normalizedUrl === '/' ? '/es' : '/es' + normalizedUrl;
    } else {
      targetUrl = normalizedUrl;
    }

    if (this.router.url !== targetUrl) {
      this.router.navigateByUrl(targetUrl);
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
