<<<<<<< HEAD
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ActividadesAdminComponent } from './components/actividades-admin/actividades-admin.component';

export const routes: Routes = [{
    path:'login',
    component:LoginComponent,
},
{
    path:'admin',
    component:ActividadesAdminComponent,
},
{
    path: '**', 
    redirectTo: 'login', 
    pathMatch: 'full'
}
];
=======
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ActividadesAdminComponent } from './components/actividades-admin/actividades-admin.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ActividadesComponent } from './components/actividades/actividades.component';

export const routes: Routes = [
{
    path: 'inicio',
    component: HomeComponent
},
{
    path: 'usuario',
    component: UsuariosComponent
},
{
    path: 'actividades',
    component: ActividadesComponent
},
{
    path:'login',
    component:LoginComponent,
},
{
    path:'admin',
    component:ActividadesAdminComponent,
},
{
    path: '**', 
    redirectTo: 'inicio', 
    pathMatch: 'full'
}
];
>>>>>>> e6b539547a53cba9e96ad508ff8f36c25836bd4d
