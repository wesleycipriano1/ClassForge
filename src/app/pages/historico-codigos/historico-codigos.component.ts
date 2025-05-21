import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Subject, takeUntil } from 'rxjs';

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
  styleUrls: ['./historico-codigos.component.scss']
})
export class HistoricoCodigosComponent implements OnInit, OnDestroy {
  historicoCompleto: HistoricoItem[] = [];
  paginaAtual = 1;
  porPagina = 10;
  codigoExpandidoId: number | null = null;
  carregando = true;
  mensagemFeedback = '';

  private destroy$ = new Subject<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarHistorico();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private carregarHistorico(): void {
    this.http.get<HistoricoItem[]>(`${environment.apiUrl}/classe/historico`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.historicoCompleto = res;
          this.carregando = false;
        },
        error: (err) => {
          console.error('Erro ao buscar histórico:', err);
          this.mostrarFeedback('Erro ao carregar histórico');
          this.carregando = false;
        }
      });
  }

  get historicoPaginado(): HistoricoItem[] {
    const inicio = (this.paginaAtual - 1) * this.porPagina;
    return this.historicoCompleto.slice(inicio, inicio + this.porPagina);
  }

  expandirOuFechar(item: HistoricoItem): void {
    this.codigoExpandidoId = this.codigoExpandidoId === item.id ? null : item.id;
  }

  async copiar(codigo: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(codigo);
      this.mostrarFeedback('Código copiado!');
    } catch (err) {
      console.error('Falha ao copiar:', err);
      this.mostrarFeedback('Erro ao copiar código');
    }
  }

  async excluir(item: HistoricoItem): Promise<void> {
    const confirmado = confirm('Tem certeza que deseja excluir este item?');
    if (!confirmado) return;

    this.http.delete(`${environment.apiUrl}/classe/deletar/${item.id}`)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.historicoCompleto = this.historicoCompleto.filter(h => h.id !== item.id);
          this.mostrarFeedback('Item excluído com sucesso');
          this.ajustarPaginaAposExclusao();
        },
        error: (err) => {
          console.error('Erro ao excluir:', err);
          this.mostrarFeedback('Erro ao excluir item');
        }
      });
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

  private mostrarFeedback(mensagem: string): void {
    this.mensagemFeedback = mensagem;
    setTimeout(() => this.mensagemFeedback = '', 3000);
  }
}