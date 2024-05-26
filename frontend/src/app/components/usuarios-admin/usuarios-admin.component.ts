import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedEventService } from '../../services/shared-event.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BaseComponent } from '../base/base.component';
import { TablaUsuariosComponent } from '../tabla-usuario/tabla-usuarios.component';
import { TablaActividadesComponent } from '../tabla-actividades/tabla-actividades.component';
import { TablaClientesComponent } from '../tabla-clientes/tabla-clientes.component';
import { TablaAuditoriaComponent } from '../tabla-auditoria/tabla-auditoria.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-usuarios-admin',
  standalone: true,
  imports: [
    BaseComponent,
    TablaUsuariosComponent, 
    TablaActividadesComponent, 
    TablaClientesComponent, 
    TablaAuditoriaComponent,
    NgIf
  ],
  templateUrl: './usuarios-admin.component.html',
  styleUrl: './usuarios-admin.component.scss'
})
export class UsuariosAdminComponent  {
  
}

