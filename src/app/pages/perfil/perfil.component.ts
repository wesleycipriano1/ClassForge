import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-perfil',
  standalone: true,
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class PerfilComponent {

  usuario = {
    login: 'joaobarbosa32',
    nome: 'joão babosa',
    email: 'jaobarbosa@example.com',
    telefone: '(81) 98888-7777',
    endereco: 'Rua Exemplo, 123 - Serra Talhada',
    foto: 'https://primefaces.org/cdn/primeng/images/demo/avatar/amyelsner.png'
  };
  form: FormGroup;
  mudarSenhaVisivel = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      nome: [this.usuario.nome, Validators.required],
      email: [this.usuario.email, [Validators.required, Validators.email]],
      celular: [this.usuario.telefone, Validators.required],
      endereco: [this.usuario.endereco, Validators.required],
      senhaAtual: [''],
      novaSenha: ['']
    });
  }

  salvar() {
    if (this.form.valid) {
      console.log('Perfil salvo:', this.form.value);
      
    }
  }

  toggleMudarSenha() {
    this.mudarSenhaVisivel = !this.mudarSenhaVisivel;
  }
}
