import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LucideAngularModule } from 'lucide-angular';
import { Search, LogOut, User } from 'lucide-angular';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})
export class TopbarComponent {
  ativo: string = 'criar';

  constructor(private authService: AuthService, private router: Router) {}

  verHitorico() {
    this.ativo = 'historico';
    this.router.navigate(['/historico']);
  }
  criarCodigo() {
    this.ativo = 'criar';
    this.router.navigate(['/criar']);
  }
  logout() {
    this.authService.logout();
  }

  abrirPerfil() {
    this.ativo = '';
    this.router.navigate(['/perfil']);
  }
}
