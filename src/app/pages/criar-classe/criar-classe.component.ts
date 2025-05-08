import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ErrorService } from '../../services/error.service';
import { LoadingService } from '../../shared/loading.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-criar-classe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criar-classe.component.html',
  styleUrls: ['./criar-classe.component.scss']
})
export class CriarClasseComponent {
  form: FormGroup;
  codigoGerado: string = '';
  

  constructor(private fb: FormBuilder,
     private http: HttpClient,
     private erroService: ErrorService,
     private loadindService: LoadingService,
     

     
    
    
    ) {
    
    this.form = this.fb.group({
      linguagem: ['java', Validators.required],
      nomeClasse: ['', Validators.required],
      encapsulamento: ['public', Validators.required],
      heranca: [''],
      atributos: this.fb.array([
        this.criarAtributo()
      ])
    });
  }

  get atributos(): FormArray {
    return this.form.get('atributos') as FormArray;
  }

  criarAtributo(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      tipo: ['String', Validators.required],
      visibilidade: ['private', Validators.required]
    });
  }

  adicionarAtributo() {
    this.atributos.push(this.criarAtributo());
  }

  removerAtributo(index: number) {
    this.atributos.removeAt(index);
  }
  copiarCodigo() {
    if (this.codigoGerado) {
      navigator.clipboard.writeText(this.codigoGerado)
        .then(() => this.erroService.showError("Código copiado com sucesso!"))// depois lembrar de criar uma classe de mensagenm que não seja de erro
        .catch(() => this.erroService.showError("Erro ao copiar o código."));
    }
  }
  

  gerarClasse() {
    
    const linguagem = this.form.value.linguagem;
    if (this.form.valid) {
      this.loadindService.mostrar();
      this.http.post<{ codigo: string }>(environment.apiUrl+`/gerar-classe/${linguagem}`, this.form.value)

        .subscribe({
          next: res => {this.codigoGerado = res.codigo,
          this.loadindService.esconder();;
        },
          error: err => {this.erroService.showError("Erro ao gerar classe, não foi possível conectar ao servidor!")
            ,this.loadindService.esconder();
          },
        });
    } else {
      this.erroService.showError("Preencha todos os campos obrigatórios!");
    }
  }
}
