import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { CriarClasseComponent } from './pages/criar-classe/criar-classe.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { HistoricoCodigosComponent } from './pages/historico-codigos/historico-codigos.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { authGuard } from './core/guards/auth.guard';
import { RedefinirSenhaComponent } from './pages/redefinir-senha/redefinir-senha.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'criar', component: CriarClasseComponent },
      { path: 'historico', component: HistoricoCodigosComponent },
    ],
  },
  {
    path: 'redefinir-senha',
    component: RedefinirSenhaComponent,
  },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'recuperar-senha',
    component: RecuperarSenhaComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  { path: '**', redirectTo: 'login' },
];
