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

@Injectable({ providedIn: 'root' })
export class LanguageGuard implements CanActivate {
  supportedLangs = ['en', 'fr', 'de'];

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const lang = route.paramMap.get('lang');
    return this.supportedLangs.includes(lang ?? '');
  }
}

export const routes: Routes = [
  {
    path: ':lang',
    component: MainLayoutComponent, 
    children: [
      { path: '', component: LandingComponent },
      { path: 'valuation', component: ValuationComponent },
      {
        path: 'stocks/:exchange-ticker/peter-lynch-fair-value-calculator',
        component: ValuateComponent
      },
      // ... your other child routes
    ]
  },
  { path: '', component: LanguageRedirectComponent, pathMatch: 'full' },
  { path: '**', redirectTo: 'en' }
];