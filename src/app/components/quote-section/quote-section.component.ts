import { Component, OnInit } from '@angular/core';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-quote-section',
  standalone: true,
  templateUrl: './quote-section.component.html',
  styleUrls: ['./quote-section.component.css']
})
export class QuoteSectionComponent implements OnInit {
  screenshot = 'lynch-photo.png';
  quoteText = '';
  quoteAuthor = '';
  quoteAuthorSubtitle = '';

  constructor(private browserStorageService: BrowserStorageService) {}

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem('language');
    if (lang === 'ru') {
      this.quoteText = 'Инвестирование без исследований подобно игре в стад-покер, не глядя в карты.';
      this.quoteAuthor = 'Питер Линч';
      this.quoteAuthorSubtitle = 'Управляющий инвестиционным фондом Fidelity Magellan в 1977-1990';
    } else {
      this.quoteText = 'Investing without research is like playing stud poker and never looking at the cards.';
      this.quoteAuthor = 'Peter Lynch';
      this.quoteAuthorSubtitle = 'Fidelity Magellan Fund Manager 1977-1990';
    }
  }
}
