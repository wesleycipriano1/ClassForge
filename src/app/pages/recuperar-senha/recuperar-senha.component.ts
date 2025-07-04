import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { Router } from '@angular/router';
import { MensagemService } from '../../services/mensagem.service';
import { LoadingService } from '../../shared/loading.service';
import { LoadingOverlayComponent } from '../../shared/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.scss'],
  imports: [CommonModule, ReactiveFormsModule,LoadingOverlayComponent],
})
export class RecuperarSenhaComponent {
  form: FormGroup;
  enviado = false;
  carregando = false;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private mensagemService: MensagemService,
    private loadingService: LoadingService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  voltarLogin() {
    
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.carregando) return;
    if (this.form.valid) {
      const email = this.form.value.email;
      
      this.loadingService.mostrar();

      this.http
        .post(`${environment.apiUrl}/api/recuperar-senha/solicitar`, { email })
        .subscribe({
          next: () => {
            this.enviado = true;
            this.carregando = false;
            this.loadingService.esconder();
            this.mensagemService.sucesso(
              'Email de recuperação enviado com sucesso!'
            );
          },
          error: (err) => {
            console.error('Erro ao enviar e-mail de recuperação:', err);
            
            this.loadingService.esconder();
            this.mensagemService.erro(
              'Erro ao enviar e-mail. Verifique o endereço informado.'
            );
          },
        });
    }
  }
}
