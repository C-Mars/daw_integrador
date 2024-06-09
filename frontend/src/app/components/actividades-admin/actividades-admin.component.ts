import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { NgIf } from '@angular/common';
import { TablaAuditoriaComponent } from '../tabla-auditoria/tabla-auditoria.component';
import { TablaUsuariosComponent } from '../tabla-usuario/tabla-usuarios.component';
import { TablaClientesComponent } from '../tabla-clientes/tabla-clientes.component';
import { TablaActividadesModule } from '../tabla-actividades/tabla-actividades.module';
import { TablaActividadesComponent } from '../tabla-actividades/tabla-actividades.component';

@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [
    BaseComponent,
    TablaUsuariosComponent,
    TablaClientesComponent,
    TablaAuditoriaComponent,
    NgIf,
    TablaActividadesModule
  ],
  templateUrl: './actividades-admin.component.html',
  styleUrls: ['./actividades-admin.component.scss']
})
export class ActividadesAdminComponent {}
