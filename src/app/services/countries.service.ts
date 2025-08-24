import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {
  private getCountriesInfoUrl = 'https://finefoliobe.onrender.com/countries/'
  //private getCountriesInfoUrl = 'http://127.0.0.1:8000/countries/'

  constructor(private http: HttpClient) { }

  public getCountriesInfo(countries:string[]): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { codes: countries};
    return this.http.post(this.getCountriesInfoUrl,
        JSON.stringify(body),
        {headers: headers}
    ).pipe(catchError(this.erroHandler));
  }
  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}
