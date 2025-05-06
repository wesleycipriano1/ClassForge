import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private  baseUrl = 'http://localhost:8080';
  

  constructor(private http: HttpClient,private router: Router) { }

login(email: string, senha:string):Observable<boolean>{
  return this.http.post<boolean>(`${this.baseUrl}/login`, {email:email, senha:senha});
}


logout() {
   this.router.navigate(['/login']);
  localStorage.removeItem('token');
  }
}
