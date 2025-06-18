import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '../../shared/loading.service';
import { environment } from '../../../environments/environment';
import { MensagemService } from '../../services/mensagem.service';

@Component({
  selector: 'app-criar-classe',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './criar-classe.component.html',
  styleUrls: ['./criar-classe.component.scss'],
})
export class CriarClasseComponent {
  form: FormGroup;
  codigoGerado: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private mensagemService: MensagemService,
    private loadindService: LoadingService
  ) {
    this.form = this.fb.group({
      linguagem: ['java', Validators.required],
      nomeClasse: ['', Validators.required],
      encapsulamentoClasse: ['public', Validators.required],
      heranca: [''],
      interfaces: [''], 
      atributos: this.fb.array([this.criarAtributo()]),
    });
  }

  get atributos(): FormArray {
    return this.form.get('atributos') as FormArray;
  }

  criarAtributo(): FormGroup {
    return this.fb.group({
      nome: ['', Validators.required],
      tipo: ['String', Validators.required],
      encapsulamento: ['private', Validators.required],
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
      navigator.clipboard
        .writeText(this.codigoGerado)
        .then(() => this.mensagemService.sucesso('Código copiado com sucesso!')) 
        .catch(() => this.mensagemService.erro('Erro ao copiar o código.'));
    }
  }

  gerarClasse() {
  if (this.form.valid) {
    this.loadindService.mostrar();

    const formValue = this.form.value;

   const payload = {
  ...formValue,
  interfaces: formValue.interfaces
    ? formValue.interfaces
        .split(',')
        .map((i: string) => i.trim())
        .filter((i: string) => i)
    : [],
};


    this.http
      .post(environment.apiUrl + `/classe/gerar`, payload, {
        responseType: 'text',
      })
      .subscribe({
        next: (res: string) => {
          this.codigoGerado = res;
          this.loadindService.esconder();
        },
        error: (err) => {
          console.error('Erro ao gerar classe:', err);
          this.mensagemService.erro(
            'Erro ao gerar classe, não foi possível conectar ao servidor!'
          );
          this.loadindService.esconder();
        },
      });
  } else {
    this.mensagemService.erro('Preencha todos os campos obrigatórios!');
  }
}

}
