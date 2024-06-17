import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { NgIf } from '@angular/common';
import { TablaAuditoriaComponent } from '../tabla-auditoria/tabla-auditoria.component';
import { TablaUsuariosComponent } from '../tabla-usuario/tabla-usuarios.component';
import { TablaClientesComponent } from '../tabla-clientes/tabla-clientes.component';
import { TablaActividadesComponent } from '../tabla-actividades/tabla-actividades.component';

@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [
    NgIf,
    BaseComponent,
    TablaUsuariosComponent,
    TablaClientesComponent,
    TablaAuditoriaComponent,
    TablaActividadesComponent
  ],
  templateUrl: './actividades-admin.component.html',
  styleUrls: ['./actividades-admin.component.scss']
})
export class ActividadesAdminComponent {

}
