import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { MenuLateralAdminComponent } from '../menu-lateral-admin/menu-lateral-admin.component';
import { TablaUsuariosComponent } from '../tabla-usuario/tabla-usuarios.component';
import { NgIf } from '@angular/common';

import { Subscription } from 'rxjs';
import { SharedEventService } from '../../services/shared-event.service';
import { TablaActividadesComponent } from '../tabla-actividades/tabla-actividades.component';
import { TablaClientesComponent } from '../tabla-clientes/tabla-clientes.component';
import { TablaAuditoriaComponent } from '../tabla-auditoria/tabla-auditoria.component';

@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [BaseComponent,
    MenuLateralAdminComponent,
    TablaUsuariosComponent, TablaActividadesComponent,TablaClientesComponent,TablaAuditoriaComponent,
  NgIf],
  templateUrl: './actividades-admin.component.html',
  styleUrl: './actividades-admin.component.scss'
})
export class ActividadesAdminComponent implements OnInit, OnDestroy {
  tablaUsuVisible: boolean = false;
  tablaCliVisible: boolean = false;
  tablaActVisible: boolean = false;
  tablaAudVisible: boolean = false;
  
  private subscription!: Subscription;

  constructor(private sharedEventService: SharedEventService) {}

  ngOnInit() {
    this.subscription = this.sharedEventService.usersClick$.subscribe(() => {
      this.showTablaUsuarios();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showTablaUsuarios() {
    this.tablaUsuVisible = true;
  }
  showTablaClientes() {
    this.tablaCliVisible = true;
  }
  showTablaActividades() {
    this.tablaActVisible = true;
  }
  showTablaAuditorias() {
    this.tablaAudVisible = true;
  }
}
