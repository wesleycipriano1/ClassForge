import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  loginForm: FormGroup;
  carregando = false;
  mostrarSenha = false;





  constructor(
    private errorService: ErrorService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.loginForm=this.fb.group({
      email:['',[Validators.required,Validators.email]],
      senha:['',[Validators.required,Validators.minLength(6)]]
      
    })
  }
  onsubmit(): void {
    if (this.carregando) return; 
  
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
  
    const { email, senha } = this.loginForm.value;
    this.carregando = true;
  
    this.authService.login(email, senha).subscribe({
      next: (foi) => {
        this.carregando = false;
        if (foi) {
          console.log('Login bem-sucedido!');
          this.router.navigate(['/home']);
        } else {
          this.errorService.showError("Email ou senha inválidos!");
        }
      },
      error: (err) => {
        this.carregando = false;
        this.errorService.showError("Sem conexão com o servidor!");
        console.error('Erro ao fazer login:', err);
      }
    });
  }
  
  get email(){
    return this.loginForm.get('email');
  }
  get senha(){
    return this.loginForm.get('senha')
  }
  
 alternarSenha(): void {
  this.mostrarSenha = !this.mostrarSenha;
}
  

}
