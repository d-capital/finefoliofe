import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MacroDataService {
  private getMacroDataUrl = 'https://finefoliobe.onrender.com/macro_data/'
  //private getMacroDataUrl = 'http://127.0.0.1:8000/macro_data/'

  constructor(private http: HttpClient) { }

  public getMacroData(event:string,country:string): Observable<any>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.get(this.getMacroDataUrl+event + '/' + country,
      {headers: headers}).pipe(catchError(this.erroHandler));
  }
  erroHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'server Error');
  }
}