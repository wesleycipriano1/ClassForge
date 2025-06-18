import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, takeUntil } from 'rxjs';
import { MensagemService } from '../../services/mensagem.service';

interface HistoricoItem {
  id: number;
  linguagem: string;
  codigo: string;
  dataCriacao: Date;
}

@Component({
  selector: 'app-historico-codigos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico-codigos.component.html',
  styleUrls: ['./historico-codigos.component.scss'],
})
export class HistoricoCodigosComponent implements OnInit, OnDestroy {
  historicoCompleto: HistoricoItem[] = [];
  paginaAtual = 1;
  porPagina = 10;
  codigoExpandidoId: number | null = null;
  carregando = true;
  mensagemFeedback = '';

  private destroy$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private mensagemService: MensagemService
  ) {}

  ngOnInit(): void {
    this.carregarHistorico();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private carregarHistorico(): void {
    this.http
      .get<HistoricoItem[]>(`${environment.apiUrl}/classe/historico`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.historicoCompleto = res;
          this.carregando = false;
        },
        error: (err) => {
          this.mensagemService.erro('Erro ao carregar histórico');
          this.carregando = false;
        },
      });
  }

  get historicoPaginado(): HistoricoItem[] {
    const inicio = (this.paginaAtual - 1) * this.porPagina;
    return this.historicoCompleto.slice(inicio, inicio + this.porPagina);
  }

  expandirOuFechar(item: HistoricoItem): void {
    this.codigoExpandidoId =
      this.codigoExpandidoId === item.id ? null : item.id;
  }

  async copiar(codigo: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(codigo);
      this.mensagemService.sucesso('Código copiado!');
    } catch (err) {
      this.mensagemService.erro('Erro ao copiar código');
    }
  }

  async excluir(item: HistoricoItem): Promise<void> {
    try {
      const confirmado = await this.mensagemService.confirmar(
        'Confirmar exclusão',
        `Tem certeza que deseja excluir o item "${item.linguagem}"?`
      );

      if (!confirmado) return;

      this.http
        .delete(`${environment.apiUrl}/classe/deletar/${item.id}`)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.historicoCompleto = this.historicoCompleto.filter(
              (h) => h.id !== item.id
            );
            this.mensagemService.sucesso('Item excluído com sucesso!');
            this.ajustarPaginaAposExclusao();
          },
          error: (err) => {
            console.error('Erro ao excluir:', err);
            this.mensagemService.erro('Erro ao excluir item');
          },
        });
    } catch (error) {
      console.error('Erro na confirmação:', error);
      this.mensagemService.erro('Falha no processo de confirmação');
    }
  }

  private ajustarPaginaAposExclusao(): void {
    if (this.historicoPaginado.length === 0 && this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  totalPaginas(): number {
    return Math.ceil(this.historicoCompleto.length / this.porPagina);
  }

  mudarPagina(delta: number): void {
    const novaPagina = this.paginaAtual + delta;
    if (novaPagina >= 1 && novaPagina <= this.totalPaginas()) {
      this.paginaAtual = novaPagina;
    }
  }

  trackByHistorico(index: number, item: HistoricoItem): number {
    return item.id;
  }
}
