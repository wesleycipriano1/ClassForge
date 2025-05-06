import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../services/error.service';
import { AnimatedTerminalComponent } from "../../components/animated-terminal/animated-terminal.component";

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule, AnimatedTerminalComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  loginForm: FormGroup;
  carregando = false;
  mostrarSenha = false;

  
  readonly terminals: { top: string; left: string; delay: number }[] =
    this.generateNonOverlappingPositions(15, 150, 100);

  constructor(
    private errorService: ErrorService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { 
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
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

  get email() {
    return this.loginForm.get('email');
  }

  get senha() {
    return this.loginForm.get('senha');
  }

  alternarSenha(): void {
    this.mostrarSenha = !this.mostrarSenha;
  }

  private generateNonOverlappingPositions(count: number, minDist: number, maxAttempts: number) {
    const positions: { top: number; left: number; delay: number }[] = [];
  
    for (let i = 0; i < count; i++) {
      let attempts = 0;
      let pos: { top: number; left: number; delay: number };
  
      do {
        const top = Math.random() * 80; 
        const left = Math.pow(Math.random(), 1.5) * 100;
 
        pos = { top, left, delay: Math.floor(Math.random() * 3000) };
  
        const isFarEnough = positions.every(p => {
          const dx = p.left - pos.left;
          const dy = p.top - pos.top;
          const distance = Math.sqrt(dx * dx + dy * dy);
          return distance > minDist / 10;
        });
  
        if (isFarEnough) break;
        attempts++;
      } while (attempts < maxAttempts);
  
      positions.push(pos);
    }
  
    return positions.map(p => ({
      top: `${p.top}vh`,
      left: `${p.left}vw`,
      delay: p.delay
    }));
  }



esqueceuSenha() {
this.router.navigate(['/recuperar-senha']);
}

cadastrar() {
this.router.navigate(['/cadastro']);
}
}
