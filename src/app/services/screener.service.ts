import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenerService {
  //private getScreenerUrl = 'https://finefoliobe.onrender.com/screener/'
  //private getScreenerUrl = 'https://fine-folio.ru:3000/screener/'
  private getScreenerUrl = `http://localhost:3000/screener/`

  constructor(private http: HttpClient) { }

  public getScreenerResults(params:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { maxPe: params.maxPe, minDividend: params.minDividend};
    return this.http.post(this.getScreenerUrl,
        JSON.stringify(body),
        {headers: headers}).pipe(catchError(this.erroHandler));
  }
  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
