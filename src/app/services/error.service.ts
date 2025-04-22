import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorMessageSubject = new BehaviorSubject<string | null>(null);

  getErrorMessage(): Observable<string | null> {
    return this.errorMessageSubject.asObservable();
  }

  showError(message: string): void {
    this.errorMessageSubject.next(message);
  }

  clearError(): void {
    this.errorMessageSubject.next(null);
  }
}
