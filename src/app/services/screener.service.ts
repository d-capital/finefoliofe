import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
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
      this.getScreenerUrl = 'http://finefoliobe:3000/screener/'; 
      //local
      //this.getScreenerUrl = 'http://127.0.0.1:8000/screener/';
    } else {
      //prod
      this.getScreenerUrl = 'https://valestor.com/api/screener/';
      //local
      //this.getScreenerUrl = 'http://127.0.0.1:8000/screener/';
    }
  }

  public getScreenerResults(params: { maxPe: number; minDividend: number }): Observable<ScreenerResult[]>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { maxPe: params.maxPe, minDividend: params.minDividend};
    return this.http.post<ScreenerResult[]>(this.getScreenerUrl,
      JSON.stringify(body),
      {headers: headers}).pipe(catchError(this.erroHandler));
  }
  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
