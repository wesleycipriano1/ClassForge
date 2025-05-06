import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class CadastroComponent {
  cadastroForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.cadastroForm.invalid) return;

    const { senha, confirmarSenha } = this.cadastroForm.value;

    if (!this.senhasIguais()) {
      alert('As senhas não coincidem.');
      return;
    }

    console.log('Cadastro realizado:', this.cadastroForm.value);
    // Aqui futuramente você fará a requisição para a API
  }

  senhasIguais(){
    if (this.senha?.value === this.confirmarSenha?.value) {
      return true;
    } else {
      return false;
    } 
  }

  get nome() { return this.cadastroForm.get('nome'); }
  get email() { return this.cadastroForm.get('email'); }
  get telefone() { return this.cadastroForm.get('telefone'); }
  get senha() { return this.cadastroForm.get('senha'); }
  get confirmarSenha() { return this.cadastroForm.get('confirmarSenha'); }
}
