import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ValuationService {
  //private getValuationUrl = 'https://finefoliobe.onrender.com/valuation/'
  //private getValuationUrl = 'http://127.0.0.1:8000/valuation/'
  private getValuationUrl:string = "";
  // = 'https://valestor.com/api/valuation/'

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 

    if (isPlatformServer(this.platformId)) {
      //prod
      this.getValuationUrl = 'http://finefoliobe:3000/valuation/'; 
      //local
      //this.getValuationUrl = 'http://127.0.0.1:8000/valuation/';
    } else {
      //prod
      this.getValuationUrl = 'https://valestor.com/api/valuation/';
      //local
      //this.getValuationUrl = 'http://127.0.0.1:8000/valuation/';
    }
  }

  public getValuation(ticker:string, exchange: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(this.getValuationUrl+exchange+"/"+ticker,
      {headers: headers}).pipe(catchError(this.erroHandler));
  }
  public getDcfValuation(ticker:string, exchange: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(this.getValuationUrl+"dcf/"+exchange+"/"+ticker,
      {headers: headers}).pipe(catchError(this.erroHandler));
  }
  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
