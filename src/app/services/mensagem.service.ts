import { Injectable } from '@angular/core';
import { MensagemComponent } from '../components/mensagem/mensagem.component';
import { Subject } from 'rxjs';

export type TipoMensagem = 'sucesso' | 'erro' | 'alerta' | 'info' | 'confirmacao';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {
  private mensagemComponent?: MensagemComponent;
  private respostaConfirmacao = new Subject<boolean>();
  private timeoutId: any = null;

  registrarComponente(componente: MensagemComponent): void {
    this.mensagemComponent = componente;
  }

  mostrar(
    tipo: TipoMensagem, 
    mensagem: string, 
    detalhes: string = '',
    duracao: number = 5000
  ): void {
    if (!this.mensagemComponent) return;

    // Cancela qualquer timeout existente
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }

    this.mensagemComponent.tipo = tipo;
    this.mensagemComponent.mensagem = mensagem;
    this.mensagemComponent.detalhes = detalhes;
    this.mensagemComponent.mostrar = true;
    
    // Configura timeout apenas para tipos não-confirmação
    if (tipo !== 'confirmacao' && duracao > 0) {
      this.timeoutId = setTimeout(() => {
        this.mensagemComponent!.mostrar = false;
      }, duracao);
    }
  }

  confirmar(
    mensagem: string, 
    detalhes: string = ''
  ): Promise<boolean> {
    return new Promise((resolve) => {
      // Mostra como confirmação sem timeout
      this.mostrar('confirmacao', mensagem, detalhes, 0);
      
      // Ouvinte para resposta
      const subscription = this.respostaConfirmacao.subscribe((resposta) => {
        resolve(resposta);
        subscription.unsubscribe();
      });
    });
  }

  responderConfirmacao(resposta: boolean): void {
    this.respostaConfirmacao.next(resposta);
    this.fecharMensagem();
  }

  fecharMensagem(): void {
    if (this.mensagemComponent) {
      this.mensagemComponent.mostrar = false;
    }
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }

 

  sucesso(
    mensagem: string,
    detalhes: string = '',
    duracao: number = 5000
  ): void {
    this.mostrar('sucesso', mensagem, detalhes, duracao);
  }

  erro(mensagem: string, detalhes: string = '', duracao: number = 5000): void {
    this.mostrar('erro', mensagem, detalhes, duracao);
  }

  alerta(
    mensagem: string,
    detalhes: string = '',
    duracao: number = 5000
  ): void {
    this.mostrar('alerta', mensagem, detalhes, duracao);
  }

  info(mensagem: string, detalhes: string = '', duracao: number = 5000): void {
    this.mostrar('info', mensagem, detalhes, duracao);
  }
}
