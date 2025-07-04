import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment.prod';
import { MensagemService } from '../../services/mensagem.service';
import { LoadingService } from '../../shared/loading.service';
import { LoadingOverlayComponent } from '../../shared/loading-overlay/loading-overlay.component';

@Component({
  selector: 'app-redefinir-senha',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LoadingOverlayComponent],
  templateUrl: './redefinir-senha.component.html',
  styleUrls: ['./redefinir-senha.component.scss'],
})
export class RedefinirSenhaComponent {
  form: FormGroup;
  token: string = '';
  enviado = false;
  carregando = false;

  constructor(
    private mensagemService: MensagemService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private loandingService: LoadingService
  ) {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';

    this.form = this.fb.group({
      novaSenha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', Validators.required],
    });
  }

  voltarLogin() {
    this.router.navigate(['/login']);
  }

  onSubmit() {
    if (this.carregando) return;
    if (
      this.form.valid &&
      this.form.value.novaSenha === this.form.value.confirmarSenha
    ) {
      const payload = {
        token: this.token,
        novaSenha: this.form.value.novaSenha,
      };

      
      this.loandingService.mostrar();

      this.http
        .post(`${environment.apiUrl}/api/recuperar-senha/redefinir`, payload)
        .subscribe({
          next: () => {
            this.carregando = false;
            this.loandingService.esconder();
            this.mensagemService.sucesso('Senha redefinida com sucesso!');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            this.carregando = false;
            this.loandingService.esconder();
            this.mensagemService.erro(
              `Erro ao redefinir senha: ${err.status} - ${
                err.error?.message || 'Sem detalhes'
              }`
            );
          },
        });
    } else {
      this.carregando = false;
      this.loandingService.esconder();
      this.mensagemService.alerta('As senhas não coincidem.');
    }
  }
}
