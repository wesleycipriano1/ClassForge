import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  

  constructor(private http: HttpClient,private router: Router) { }

login(email: string, senha:string){
  return this.http.post<{token: string}>('$environment.apiUrl/login', {email, senha}).pipe(
    map(resposta=>{
      localStorage.setItem('token', resposta.token);
      return {sucess : true} ;
    }),
    catchError(error => {
      if (error.status === 404) {
        
        return throwError(() => new Error('conexao'));
      } else if (error.status === 401 || error.status === 400) {
        
        return throwError(() => new Error('credenciais'));
      } else {
        return throwError(() => new Error('desconhecido'));
      }
    })
  );
  
}


logout() {
   this.router.navigate(['/login']);
  localStorage.removeItem('token');
  }
}
