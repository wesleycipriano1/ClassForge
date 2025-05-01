import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { LayoutComponent } from './layout/layout.component';
import { CriarClasseComponent } from './pages/criar-classe/criar-classe.component';

 export const routes: Routes = [

    {path: '', component:LayoutComponent,
    children: [
        { 
        path: 'home', component: HomeComponent }, 

        { path: 'perfil', component: PerfilComponent }, 
        { path:'criar', component:CriarClasseComponent},
    ]
    },
    
    { 
      path: 'login', 
      component: LoginComponent 
    },
  ];
