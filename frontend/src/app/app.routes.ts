import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ActividadesAdminComponent } from './components/actividades-admin/actividades-admin.component';
import { HomeComponent } from './components/home/home.component';
import { TablaUsuariosComponent } from './components/tabla-usuario/tabla-usuarios.component';
import { UsuariosAdminComponent } from './components/usuarios-admin/usuarios-admin.component';
import { ClientesAdminComponent } from './components/clientes-admin/clientes-admin.component';
import { InicioAdminComponent } from './components/inicio-admin/inicio-admin.component';
import { TablaAuditoriaComponent } from './components/tabla-auditoria/tabla-auditoria.component';
import { AuditoriaAdminComponent } from './components/auditoria-admin/auditoria-admin.component';


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
    path: 'inicio-admin',
    component: InicioAdminComponent
},
{
    path:'actividades',
    component:ActividadesAdminComponent,
},
{
    path:'usuarios',
    component:UsuariosAdminComponent,
},
{
    path:'clientes',
    component: ClientesAdminComponent,
},
{
    path:'auditoria',
    component: AuditoriaAdminComponent,

    
},
{
    path: '**', 
    redirectTo: 'inicio', 
    pathMatch: 'full'
}
];
