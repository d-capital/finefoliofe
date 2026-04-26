import { ActivatedRouteSnapshot, CanActivate, Routes } from '@angular/router';
import { ArticleComponent } from './components/article/article.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { MacrodataComponent } from './pages/macrodata/macrodata.component';
import { ValuationComponent } from './pages/valuation/valuation.component';
import { ValuateComponent } from './components/valuate/valuate.component';
import { AboutComponent } from './pages/about/about.component';
import { ScreenerComponent } from './pages/screener/screener.component';
import { ArticlelistComponent } from './components/articlelist/articlelist.component';
import { Injectable } from '@angular/core';
import { LanguageRedirectComponent } from './components/laguage-redirect/laguage-redirect.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { CookiePolicyComponent } from './pages/cookie-policy/cookie-policy.component';

@Injectable({ providedIn: 'root' })
export class LanguageGuard implements CanActivate {
  supportedLangs = ['en', 'fr', 'de'];

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const lang = route.paramMap.get('lang');
    return this.supportedLangs.includes(lang ?? '');
  }
}

export const routes: Routes = [
  // Russian routes under /ru
  {
    path: 'ru',
    component: MainLayoutComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'cookie-policy', component: CookiePolicyComponent },
      { path: 'valuation', component: ValuationComponent },
      {
        path: 'stocks/:exchange-ticker/peter-lynch-fair-value-calculator',
        component: ValuateComponent
      },
      // ... your other child routes
    ]
  },
  // English routes at root
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: LandingComponent },
      { path: 'cookie-policy', component: CookiePolicyComponent },
      { path: 'valuation', component: ValuationComponent },
      {
        path: 'stocks/:exchange-ticker/peter-lynch-fair-value-calculator',
        component: ValuateComponent
      },
      // ... your other child routes
    ]
  },
  // Redirect unknown paths to root
  { path: '**', redirectTo: '' }
];