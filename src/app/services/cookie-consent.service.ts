import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformServer } from '@angular/common';
import { BrowserStorageService } from './browser-storage.service';
import { tap } from 'rxjs/operators';

interface CookieConsentData {
  userId: string;
  timestamp: string;
  userAgent: string;
}

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private readonly CONSENT_KEY = 'cookieConsent';
  private readonly USER_ID_KEY = 'userId';
  // Update this URL to your backend endpoint
  private saveConsentUrl:string = "";

  constructor(
    private browserStorageService: BrowserStorageService,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.initializeUserId();
    if (isPlatformServer(this.platformId)) {
      //prod
      this.saveConsentUrl = 'http://finefoliobe:3000/saveconsent/'; 
      //local
      //this.saveConsentUrl = 'http://127.0.0.1:8000/saveconsent/';
    } else {
      //prod
      this.saveConsentUrl = 'https://valestor.com/api/saveconsent/';
      //local
      //this.saveConsentUrl = 'http://127.0.0.1:8000/saveconsent/';
    }
  }

  /**
   * Инициализирует или получает уникальный ID пользователя
   */
  private initializeUserId(): void {
    let userId = this.browserStorageService.getItem(this.USER_ID_KEY);
    if (!userId) {
      // Генерируем уникальный ID если нет
      userId = this.generateUserId();
      this.browserStorageService.setItem(this.USER_ID_KEY, userId);
      console.log('[CookieConsent] Generated new userId:', userId);
    } else {
      console.log('[CookieConsent] Using existing userId:', userId);
    }
  }

  /**
   * Генерирует уникальный ID пользователя
   */
  private generateUserId(): string {
    // Формат: timestamp + random + user agent hash
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substring(2, 10);
    return `user_${timestamp}_${random}`;
  }

  /**
   * Проверяет, дал ли пользователь согласие на cookies
   */
  hasConsented(): boolean {
    const consent = this.browserStorageService.getItem(this.CONSENT_KEY);
    const result = consent === 'true';
    console.log('[CookieConsent] Check consent:', result);
    return result;
  }

  /**
   * Получает ID пользователя
   */
  getUserId(): string {
    const userId = this.browserStorageService.getItem(this.USER_ID_KEY);
    return userId || '';
  }

  /**
   * Сохраняет согласие пользователя локально и отправляет на Python бэкенд
   */
  acceptCookies(): Observable<any> {
    console.log('[CookieConsent] Accepting cookies...');
    
    // Сохраняем в localStorage
    this.browserStorageService.setItem(this.CONSENT_KEY, 'true');
    console.log('[CookieConsent] Saved consent to localStorage');

    // Отправляем на Python бэкенд
    const userId = this.getUserId();
    const consentData: CookieConsentData = {
      userId,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    };

    console.log('[CookieConsent] Sending data to backend:', this.saveConsentUrl);
    console.log('[CookieConsent] Payload:', consentData);

    return this.http.post(this.saveConsentUrl, consentData).pipe(
      tap(
        (response) => {
          console.log('[CookieConsent] Backend response:', response);
        },
        (error) => {
          console.error('[CookieConsent] Backend error:', error);
        }
      )
    );
  }

  /**
   * Отказывает согласие (может быть использовано в будущем)
   */
  rejectCookies(): void {
    this.browserStorageService.setItem(this.CONSENT_KEY, 'false');
    console.log('[CookieConsent] Cookies rejected');
  }
}
