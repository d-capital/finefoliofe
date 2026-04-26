import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CookieConsentComponent } from './cookie-consent.component';
import { CookieConsentService } from '../../services/cookie-consent.service';
import { of } from 'rxjs';

describe('CookieConsentComponent', () => {
  let component: CookieConsentComponent;
  let fixture: ComponentFixture<CookieConsentComponent>;
  let cookieConsentService: jasmine.SpyObj<CookieConsentService>;

  beforeEach(async () => {
    const cookieServiceSpy = jasmine.createSpyObj('CookieConsentService', [
      'hasConsented',
      'acceptCookies',
      'getUserId'
    ]);

    await TestBed.configureTestingModule({
      imports: [CookieConsentComponent],
      providers: [
        { provide: CookieConsentService, useValue: cookieServiceSpy }
      ]
    }).compileComponents();

    cookieConsentService = TestBed.inject(CookieConsentService) as jasmine.SpyObj<CookieConsentService>;
    fixture = TestBed.createComponent(CookieConsentComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show notification when user has not consented', () => {
    cookieConsentService.hasConsented.and.returnValue(false);
    fixture.detectChanges();
    expect(component.showNotification).toBe(true);
  });

  it('should not show notification when user has already consented', () => {
    cookieConsentService.hasConsented.and.returnValue(true);
    fixture.detectChanges();
    expect(component.showNotification).toBe(false);
  });

  it('should hide notification when user clicks agree', () => {
    cookieConsentService.hasConsented.and.returnValue(false);
    cookieConsentService.acceptCookies.and.returnValue(of({}));
    fixture.detectChanges();
    
    component.onAgree();
    fixture.detectChanges();

    expect(component.showNotification).toBe(false);
  });
});
