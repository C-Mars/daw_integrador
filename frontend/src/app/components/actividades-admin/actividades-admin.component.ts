import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { TablaUsuariosComponent } from '../tabla-usuario/tabla-usuarios.component';
import { NgIf } from '@angular/common';
import { Subscription } from 'rxjs';
import { TablaActividadesComponent } from '../tabla-actividades/tabla-actividades.component';
import { TablaClientesComponent} from '../tabla-clientes/tabla-clientes.component';
import { TablaAuditoriaComponent } from '../tabla-auditoria/tabla-auditoria.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [
    BaseComponent,
    TablaActividadesComponent, 
  ],
  templateUrl: './actividades-admin.component.html',
  styleUrl: './actividades-admin.component.scss'
})
export class ActividadesAdminComponent {
  
  constructor() { }

 
  
}
