import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ScreenerResult } from '../dto/screener/screener-result.model';
import { catchError } from 'rxjs/operators';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ScreenerService {
  //private getScreenerUrl = 'https://finefoliobe.onrender.com/screener/'
  //private getScreenerUrl = 'https://127.0.0.1:8000/screener/'
  private getScreenerUrl = ""
  //'/api/screener/'

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 

    if (isPlatformServer(this.platformId)) {
      //prod
      //this.getScreenerUrl = 'http://finefoliobe:3000/screener/'; 
      //local
      this.getScreenerUrl = 'http://localhost:64663/valuation/screener';
    } else {
      //prod
      //this.getScreenerUrl = 'https://valestor.com/api/screener/';
      //local
      this.getScreenerUrl = 'http://localhost:64663/valuation/screener';
    }
  }

  public getScreenerResults(params: { minDividend: number; exchange: string }): Observable<ScreenerResult[]> {
    const httpParams = new HttpParams()
      .set('minDividend', params.minDividend)
      .set('exchange', params.exchange);

    return this.http.get<ScreenerResult[]>(this.getScreenerUrl, { params: httpParams })
      .pipe(catchError(this.erroHandler));
  }

  private erroHandler(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
