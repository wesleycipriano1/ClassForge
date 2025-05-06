import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-historico-codigos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './historico-codigos.component.html',
  styleUrls: ['./historico-codigos.component.scss']
})
export class HistoricoCodigosComponent {
  historicoCompleto = [
    { titulo: 'Classe Cliente', codigo: 'public class Cliente {\n private String nome;\n}' },
    { titulo: 'Classe Produto', codigo: 'public class Produto {\n private double preco;\n}' },
    { titulo: 'Classe Pedido', codigo: 'public class Pedido {\n private List<Item> itens;\n}' },
    { titulo: 'Classe Usuario', codigo: 'public class Usuario {\n private String email;\n}' },
    { titulo: 'Classe Carro', codigo: 'public class Carro {\n private String modelo;\n}' },
    { titulo: 'Classe Animal', codigo: 'public class Animal {\n private String especie;\n}' },
    { titulo: 'Classe Livro', codigo: 'public class Livro {\n private String autor;\n}' },
    { titulo: 'Classe Endereco', codigo: 'public class Endereco {\n private String rua;\n}' },
    { titulo: 'Classe Funcionario', codigo: 'public class Funcionario {\n private double salario;\n}' },
    { titulo: 'Classe Conta', codigo: 'public class Conta {\n private double saldo;\n}' },
    { titulo: 'Classe Agenda', codigo: 'public class Agenda {\n private List<Evento> eventos;\n}' },
    
  ];

  paginaAtual = 1;
  porPagina = 10;
  codigoExpandido: number | null = null;

  get historicoPaginado() {
    const inicio = (this.paginaAtual - 1) * this.porPagina;
    return this.historicoCompleto.slice(inicio, inicio + this.porPagina);
  }

  expandirOuFechar(index: number) {
    this.codigoExpandido = this.codigoExpandido === index ? null : index;
  }

  copiar(codigo: string) {
    navigator.clipboard.writeText(codigo);
    alert('Código copiado!');
  }

  excluir(index: number) {
    const realIndex = (this.paginaAtual - 1) * this.porPagina + index;
    this.historicoCompleto.splice(realIndex, 1);
    if (this.historicoPaginado.length === 0 && this.paginaAtual > 1) {
      this.paginaAtual--;
    }
  }

  totalPaginas() {
    return Math.ceil(this.historicoCompleto.length / this.porPagina);
  }

  mudarPagina(delta: number) {
    const novaPagina = this.paginaAtual + delta;
    if (novaPagina >= 1 && novaPagina <= this.totalPaginas()) {
      this.paginaAtual = novaPagina;
    }
  }
}
