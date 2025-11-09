import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValuationService {
  //private getValuationUrl = 'https://finefoliobe.onrender.com/valuation/'
  private getValuationUrl = 'http://finefolio-be:3000/valuation/'

  constructor(private http: HttpClient) { }

  public getValuation(ticker:string, exchange: string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(this.getValuationUrl+exchange+"/"+ticker,
      {headers: headers}).pipe(catchError(this.erroHandler));
  }
  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
