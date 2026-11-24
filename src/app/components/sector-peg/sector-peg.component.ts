import { DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SectorPeg, SectorPegService } from '../../services/sector-peg.service';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-sector-peg',
  imports: [DecimalPipe, NgFor, NgIf],
  templateUrl: './sector-peg.component.html',
  styleUrl: './sector-peg.component.css'
})
export class SectorPegComponent implements OnInit {
  language = 'en';
  market = 'US';
  sectors: SectorPeg[] = [];
  loading = false;
  error = false;

  constructor(
    private sectorPegService: SectorPegService,
    private browserStorageService: BrowserStorageService
  ) {}

  ngOnInit(): void {
    this.language = this.browserStorageService.getItem('language') ?? 'en';
    this.market = this.language === 'ru' ? 'MOEX' : 'US';
    this.loadSectors();
  }

  getDataLanguage(): 'en' | 'ru' {
    return this.market === 'MOEX' ? 'ru' : 'en';
  }

  onMarketChange(event: Event): void {
    this.market = (event.target as HTMLSelectElement).value;
    this.loadSectors();
  }

  getBarWidth(value: number): number {
    const max = Math.max(...this.sectors.map(sector => sector.averagePeg), 0);
    return max > 0 ? (value / max) * 100 : 0;
  }

  private loadSectors(): void {
    this.loading = true;
    this.error = false;
    this.sectors = [];

    this.sectorPegService.getSectorPeg(this.market).subscribe({
      next: sectors => {
        this.sectors = sectors
          .filter(sector => sector.language === this.getDataLanguage())
          .sort((a, b) => b.averagePeg - a.averagePeg);
        this.loading = false;
      },
      error: error => {
        console.error('Failed to load sector PEG data:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }
}
