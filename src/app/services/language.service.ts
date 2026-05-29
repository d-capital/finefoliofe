import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { Label, Labels } from '../dto/labels/labels.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private getLabelUrl:string = "";

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { 

    if (isPlatformServer(this.platformId)) {
      //prod
      //this.getLabelUrl = 'http://finefoliobe:3000/labels/'; 
      //local
      this.getLabelUrl = 'http://127.0.0.1:8000/labels/';
    } else {
      //prod
      //this.getLabelUrl = 'https://valestor.com/api/labels/';
      //local
      this.getLabelUrl = 'http://127.0.0.1:8000/labels/';
    }
  }

  public getLabels(language:string, components: string[]): Observable<Labels>{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    const body = { language: language, components: components };
    return this.http.post<Labels>(
        this.getLabelUrl,
        body,
        {headers: headers}
    ).pipe(catchError((error: HttpErrorResponse) => this.erroHandler(error)));
  }
  erroHandler(error: HttpErrorResponse) {
    return throwError(() => error.message || 'server Error');
  }
}
