import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MensagemService } from '../../services/mensagem.service';

export type TipoMensagem =
  | 'sucesso'
  | 'erro'
  | 'alerta'
  | 'info'
  | 'confirmacao';

@Component({
  selector: 'app-mensagem',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.scss'],
})
export class MensagemComponent {
  @Input() tipo: TipoMensagem = 'info';
  @Input() mensagem: string = '';
  @Input() detalhes: string = '';
  @Input() mostrar: boolean = false;

  constructor(private mensagemService: MensagemService) {}

  getIcone(): string {
    switch (this.tipo) {
      case 'sucesso':
        return 'check_circle';
      case 'erro':
        return 'error';
      case 'alerta':
        return 'warning';
      case 'info':
        return 'info';
      case 'confirmacao':
        return 'help';
      default:
        return 'info';
    }
  }

  fechar(): void {
    this.mensagemService.responderConfirmacao(false);
  }

  confirmar(): void {
    this.mensagemService.responderConfirmacao(true);
  }
}
