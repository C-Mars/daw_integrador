import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ActividadesAdminComponent } from './components/actividades-admin/actividades-admin.component';
import { HomeComponent } from './components/home/home.component';


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
    path:'admin',
    component:ActividadesAdminComponent,
},
{
    path: '**', 
    redirectTo: 'inicio', 
    pathMatch: 'full'
}
];
