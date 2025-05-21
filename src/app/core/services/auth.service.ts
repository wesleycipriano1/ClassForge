import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { isTokenExpirado } from '../utils/jwt.utils';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, senha: string): Observable<{ success: boolean }> {
    return this.http
      .post<{ token: string }>(`${environment.apiUrl}/auth/login`, {
        email,
        senha,
      })
      .pipe(
        map((res) => {
          localStorage.setItem('token', res.token);
          return { success: true };
        }),
        catchError((error) => {
          if (error.status === 404)
            return throwError(() => new Error('conexao'));
          if (error.status === 401 || error.status === 400)
            return throwError(() => new Error('credenciais'));
          return throwError(() => new Error('erroDesconhecido'));
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isTokenValido(): boolean {
    const token = this.getToken();
    return token !== null && !isTokenExpirado(token);
  }
}
