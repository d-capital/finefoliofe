import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable, isDevMode, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';

export interface SectorPeg {
  market: string;
  language: string;
  sector: string;
  averagePeg: number;
}

@Injectable({
  providedIn: 'root'
})
export class SectorPegService {
  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  getSectorPeg(market: string): Observable<SectorPeg[]> {
    const apiUrl = this.getApiUrl();
    const params = new HttpParams().set('market', market);
    return this.http.get<SectorPeg[]>(apiUrl, { params });
  }

  private getApiUrl(): string {
    if (isPlatformServer(this.platformId)) {
      return 'http://finefolionet:8080/valuation/sector-peg';
    }

    return isPlatformBrowser(this.platformId)
      ? isDevMode()
        ? 'https://localhost:64662/valuation/sector-peg'
        : 'https://valestor.com/api/valuation/sector-peg'
      : 'https://valestor.com/api/valuation/sector-peg';
  }
}
