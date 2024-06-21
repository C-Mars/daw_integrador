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
import { InicioUsuarioComponent } from './components/inicio-usuario/inicio-usuario.component';
import { ActividadesUsuariosComponent } from './components/actividades-usuarios/actividades-usuarios.component';
import { adminGuard } from './guards/admin.guard';
import { usuarioGuard } from './guards/usuario.guard';


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
    loadComponent: () =>
        import('./components/inicio-admin/inicio-admin.component').then(
          (mod) => mod.InicioAdminComponent
        ),
      canActivate: [adminGuard],

},
{
    path:'actividades-admin',
    loadComponent: () =>
        import('./components/actividades-admin/actividades-admin.component').then(
          (mod) => mod.ActividadesAdminComponent
        ),
      canActivate: [adminGuard],
},
{
    path:'usuarios',
    loadComponent: () =>
        import('./components/usuarios-admin/usuarios-admin.component').then(
          (mod) => mod.UsuariosAdminComponent
        ),
      canActivate: [adminGuard],
    
},
{
    path:'clientes',
    loadComponent: () =>
        import('./components/clientes-admin/clientes-admin.component').then(
          (mod) => mod.ClientesAdminComponent
        ),
      canActivate: [adminGuard],
},
{
    path:'auditoria',
    loadComponent: () =>
        import('./components/auditoria-admin/auditoria-admin.component').then(
          (mod) => mod.AuditoriaAdminComponent
        ),
      canActivate: [adminGuard],
    
},
{
    path:'inicio-usuarios',
    loadComponent: () =>
        import('./components/inicio-usuario/inicio-usuario.component').then(
          (mod) => mod.InicioUsuarioComponent
        ),
      canActivate: [usuarioGuard],
    
},
{
    path:'actividades-usuarios',
    loadComponent: () =>
        import('./components/actividades-usuarios/actividades-usuarios.component').then(
          (mod) => mod.ActividadesUsuariosComponent
        ),
      canActivate: [usuarioGuard],
   
},
{
    path: '**', 
    redirectTo: 'inicio', 
    pathMatch: 'full'
}
];
