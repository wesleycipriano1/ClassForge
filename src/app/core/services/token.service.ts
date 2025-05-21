import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private readonly TOKEN_KEY = 'token';

  salvarToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  obterToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removerToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  tokenExpirado(): boolean {
    const token = this.obterToken();
    if (!token) return true;

    try {
      const decoded: any = jwtDecode(token);
      const exp = decoded.exp;
      const agora = Math.floor(Date.now() / 1000);
      return exp < agora;
    } catch {
      return true;
    }
  }

  estaAutenticado(): boolean {
    return !this.tokenExpirado();
  }
}
