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
  quoteText = 'Investing without research is like playing stud poker and never looking at the cards.';
  quoteAuthor = 'Peter Lynch';
  quoteAuthorSubtitle = 'Fidelity Magellan Fund Manager 1977-1990';

  constructor(private browserStorageService: BrowserStorageService) {}

  ngOnInit(): void {
    const lang = this.browserStorageService.getItem('language');
    if (lang === 'ru') {
      this.quoteText = 'Инвестирование без исследований подобно игре в стад-покер, не глядя в карты.';
      this.quoteAuthor = 'Питер Линч';
      this.quoteAuthorSubtitle = 'Управляющий инвестиционным фондом Fidelity Magellan в 1977-1990';
    } else if(lang === 'es') {
      this.quoteText = 'Invertir sin investigar es como jugar al póker y no mirar nunca las cartas.';
      this.quoteAuthor = 'Peter Lynch';
      this.quoteAuthorSubtitle = 'Gestor de fondos de Fidelity Magellan (1977-1990)';
    }
  }
}
