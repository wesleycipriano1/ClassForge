import { AfterViewInit, Component, HostListener } from '@angular/core';
import { TopbarComponent } from "../components/topbar/topbar.component";
import { FooterComponent } from "../components/footer/footer.component";
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LoadingOverlayComponent } from "../shared/loading-overlay/loading-overlay.component";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, TopbarComponent, FooterComponent, CommonModule, LoadingOverlayComponent],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('show', style({ opacity: 1 })),
      state('hide', style({ opacity: 0 })),
      transition('hide => show', [ animate('400ms ease-in') ]),
      transition('show => hide', [ animate('400ms ease-out') ])
    ])
  ]
  
})
export class LayoutComponent implements AfterViewInit {
  mostrarFooter = false;

  private scrollTimeout: any = null;

@HostListener('window:scroll', [])
onWindowScroll() {
  if (this.scrollTimeout) {
    clearTimeout(this.scrollTimeout);
  }

  this.scrollTimeout = setTimeout(() => {
    this.verificarSeDeveMostrarFooter();
  }, 100); 
}


  ngAfterViewInit(): void {
    setTimeout(() => this.verificarSeDeveMostrarFooter(), 0);
  }

  verificarSeDeveMostrarFooter() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const estaNoFinal = scrollTop + windowHeight >= docHeight - 5;
    const naoTemScroll = docHeight <= windowHeight;

    this.mostrarFooter = estaNoFinal || naoTemScroll;
  }
}
