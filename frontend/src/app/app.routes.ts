import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ActividadesAdminComponent } from './components/actividades-admin/actividades-admin.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { RegisterComponent } from './components/register/register.component';
import { AuditoriaComponent } from './components/auditoria/auditoria.component';
import { ClientesComponent } from './components/clientes/clientes.component';

export const routes: Routes = [
{
    path: 'inicio',
    component: HomeComponent
},
{
    path:'login',
    component:LoginComponent,
},
{
    path: 'usuario',
    component: UsuariosComponent
},
{
    path: 'registro',
    component: RegisterComponent
},
{
    path: 'clientes',
    component: ClientesComponent
},
{
    path: 'actividades',
    component: ActividadesComponent
},
{
    path: 'auditoria',
    component: AuditoriaComponent
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
