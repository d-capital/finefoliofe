import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RefreshService {
  // A Subject is like an EventEmitter for your internal logic
  private refreshSubject = new Subject<void>();

  // Expose it as an Observable so components can only listen, not emit
  refreshNeeded$ = this.refreshSubject.asObservable();

  // Call this method to trigger a refresh
  triggerRefresh() {
    this.refreshSubject.next();
  }
}