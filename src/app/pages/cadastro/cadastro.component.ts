import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { LoadingOverlayComponent } from '../../shared/loading-overlay/loading-overlay.component';
import { LoadingService } from '../../shared/loading.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, LoadingOverlayComponent],
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService,
    private http: HttpClient,
    private router: Router
  ) {
    this.cadastroForm = this.createForm();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
    });
  }

  get nome() {
    return this.cadastroForm.get('nome');
  }
  get email() {
    return this.cadastroForm.get('email');
  }
  get telefone() {
    return this.cadastroForm.get('telefone');
  }
  get senha() {
    return this.cadastroForm.get('senha');
  }
  get confirmarSenha() {
    return this.cadastroForm.get('confirmarSenha');
  }

  irLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    if (this.cadastroForm.invalid) return;

    if (!this.senhasIguais()) {
      alert('As senhas não coincidem.'); //depois criar um alerta personalizado
      return;
    }
    const usuario = {
      nome: this.nome?.value,
      email: this.email?.value,
      telefone: this.telefone?.value,
      senha: this.senha?.value,
    };

    this.loadingService.mostrar();

    this.http
      .post(`${environment.apiUrl}/cadastro`, usuario)
      .pipe(
        catchError((error) => {
          this.handleError(error);
          return throwError(
            () => new Error(error.message || 'Erro desconhecido')
          );
          this.loadingService.esconder();
        })
      )
      .subscribe({
        next: (response) =>
          console.log('Cadastro realizado com sucesso:', response),
        error: () => this.loadingService.esconder(),
        complete: () => this.loadingService.esconder(),
      });
  }

  private senhasIguais(): boolean {
    return this.senha?.value === this.confirmarSenha?.value;
  }

  private handleError(error: any): void {
    if (error.status) {
      switch (error.status) {
        case 400:
          console.error('Erro 400 - Requisição inválida:', error.message);
          break;
        case 404:
          alert('Erro 404 - Recurso não encontrado');
          break;
        default:
          alert('Erro desconhecido');
          break;
      }
    } else {
      alert('Erro inesperado');
    }
  }
}
