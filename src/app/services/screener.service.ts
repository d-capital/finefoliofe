import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ScreenerService {
  private getScreenerUrl = 'https://finefoliobe.onrender.com/screener/'
  //private getScreenerUrl = 'http://127.0.0.1:8000/screener/'

  constructor(private http: HttpClient) { }

  public getScreenerResults(params:any): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { params: params};
    return this.http.post(this.getScreenerUrl,
        JSON.stringify(body),
        {headers: headers}).pipe(catchError(this.erroHandler));
  }
  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
