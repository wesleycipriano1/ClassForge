
import { jwtDecode } from 'jwt-decode';

export function isTokenExpirado(token: string): boolean {
  try {
    const decoded: any = jwtDecode(token);
    const exp = decoded.exp;
    if (!exp) return true;

    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  } catch (error) {
    return true; 
  }
}
