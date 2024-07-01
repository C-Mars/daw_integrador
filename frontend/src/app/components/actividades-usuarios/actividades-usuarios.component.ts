import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { NgIf } from '@angular/common';
import { TablaAuditoriaComponent } from '../tabla-auditoria/tabla-auditoria.component';
import { TablaUsuariosComponent } from '../tabla-usuario/tabla-usuarios.component';
import { TablaClientesComponent } from '../tabla-clientes/tabla-clientes.component';
import { TablaActividadesUsuariosComponent } from '../tabla-actividades-usuarios/tabla-actividades-usuarios.component';

@Component({
  selector: 'app-actividades-usuarios',
  standalone: true,
  imports: [
    NgIf,
    BaseComponent,
    TablaUsuariosComponent,
    TablaClientesComponent,
    TablaAuditoriaComponent,
    TablaActividadesUsuariosComponent,
  ],
  templateUrl: './actividades-usuarios.component.html',
  styleUrls: ['./actividades-usuarios.component.scss']
})
export class ActividadesUsuariosComponent {

}
