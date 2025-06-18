import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MensagemComponent } from './components/mensagem/mensagem.component';
import { MensagemService } from './services/mensagem.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MensagemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  title = 'sistema_inteligente';

  @ViewChild(MensagemComponent) mensagemComponent!: MensagemComponent;

  constructor(private mensagemService: MensagemService) {}

  ngAfterViewInit(): void {
    this.mensagemService.registrarComponente(this.mensagemComponent);
  }
}
