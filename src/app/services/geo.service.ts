import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GeoService {
  private http = inject(HttpClient);

  async isRussianUser(): Promise<boolean> {
    //TODO: will need to rewrite that to proxy into back end
    /*try {
      // Using ip-api (free for testing). In production, use a paid/reliable API.
      const data = await firstValueFrom(this.http.get<{ countryCode: string }>('https://ip-api.com'));
      return data.countryCode === 'RU';
    } catch {
      return false; // Allow access if API fails, or block by default if preferred
    }*/
    return false;
  }
}