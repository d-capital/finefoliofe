import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CookieConsentService } from '../../services/cookie-consent.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
    selector: 'app-cookie-consent',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './cookie-consent.component.html',
    styleUrl: './cookie-consent.component.css'
})
export class CookieConsentComponent implements OnInit, OnDestroy {
    showNotification = false;
    
    agreeButtonLabel: string = "I Agree";
    agreeButtonLabelRu: string = "Понятно";
    agreeButtonLabelEn: string = "I Agree";

    moreInfoButtonLabel: string = "More Info";
    moreInfoButtonLabelRu: string = "Подробнее";
    moreInfoButtonLabelEn: string = "More Info";
    
    consentText: string = "By using this website, you agree to the processing of data in cookies for the correct operation of the website and traffic analysis.";
    consentTextRu: string = "Используя сайт, вы соглашаетесь на обработку данных в Cookies для корректной работы сайта и анализа трафика.";
    consentTextEn: string = "By using this website, you agree to the processing of data in cookies for the correct operation of the website and traffic analysis.";

    private destroy$ = new Subject<void>();

    constructor(
        private cookieConsentService: CookieConsentService,
        private router: Router,
        private browserStorageService: BrowserStorageService,
    ) { }

    ngOnInit(): void {
        const lang = this.browserStorageService.getItem("language");
        if (lang === "ru") {
            this.agreeButtonLabel = this.agreeButtonLabelRu;
            this.moreInfoButtonLabel = this.moreInfoButtonLabelRu;
            this.consentText = this.consentTextRu;
        }else{
            this.agreeButtonLabel = this.agreeButtonLabelEn;
            this.moreInfoButtonLabel = this.moreInfoButtonLabelEn;
            this.consentText = this.consentTextEn;
        }
        if (!this.cookieConsentService.hasConsented()) {
            console.log('[CookieConsentComponent] Showing consent notification');
            this.showNotification = true;
        } else {
            console.log('[CookieConsentComponent] User already consented, hiding notification');
        }
    }

    onAgree(): void {
        console.log('[CookieConsentComponent] User clicked Agree button');
        this.cookieConsentService.acceptCookies()
            .pipe(takeUntil(this.destroy$))
            .subscribe({
                next: (response) => {
                    console.log('[CookieConsentComponent] Consent saved successfully:', response);
                    this.showNotification = false;
                },
                error: (error) => {
                    console.error('[CookieConsentComponent] Error saving consent:', error);
                    console.log('[CookieConsentComponent] Hiding notification anyway (stored in localStorage)');
                    // Все равно скрываем уведомление и сохраняем локально
                    this.showNotification = false;
                }
            });
    }

    onMoreInfo(): void {
        console.log('[CookieConsentComponent] Opening cookie policy page');
        // Открываем страницу с политикой cookies
        this.router.navigate(['/cookie-policy']);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
