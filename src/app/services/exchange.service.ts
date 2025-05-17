import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {
  private getExchangeInfoUrl = 'http://127.0.0.1:8000/exchange/'

  constructor(private http: HttpClient) { }

  public getExchangeInfo(ticker:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(this.getExchangeInfoUrl+ticker,
      {headers: headers}).pipe(catchError(this.erroHandler));
  }
  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
