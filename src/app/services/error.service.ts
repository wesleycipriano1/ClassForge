import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, take, timer } from "rxjs";

@Injectable({ providedIn: 'root' })
export class ErrorService {
  private errorMessageSubject = new BehaviorSubject<string | null>(null);

  showError(message: string, duration: number = 5000): void {
    this.errorMessageSubject.next(message);
    timer(duration).pipe(take(1)).subscribe(() => this.clearError());
  }

  clearError(): void {
    this.errorMessageSubject.next(null);
  }

  // Adicione esta propriedade para acesso direto
  get ultimaMensagem(): string | null {
    return this.errorMessageSubject.value;
  }

  getErrorMessage(): Observable<string | null> {
    return this.errorMessageSubject.asObservable();
  }
}