import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LayoutComponent } from './layout/layout.component';
import { CriarClasseComponent } from './pages/criar-classe/criar-classe.component';
import { RecuperarSenhaComponent } from './pages/recuperar-senha/recuperar-senha.component';
import { HistoricoCodigosComponent } from './pages/historico-codigos/historico-codigos.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'perfil', component: PerfilComponent },
      { path: 'criar', component: CriarClasseComponent },
      { path: 'historico', component: HistoricoCodigosComponent },
    ],
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
