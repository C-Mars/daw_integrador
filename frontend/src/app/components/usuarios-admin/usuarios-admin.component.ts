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
  
  // ngOnInit() {
  //   this.subscriptions.add(this.sharedEventService.usersClick$.subscribe(() => {
  //     this._router.navigateByUrl('usuarios');
  //   }));

  //   this.subscriptions.add(this.sharedEventService.cliClick$.subscribe(() => {
  //     this._router.navigateByUrl('clientes');

  //   }));

  //   this.subscriptions.add(this.sharedEventService.actClick$.subscribe(() => {
  //     this._router.navigateByUrl('actividades');
  //   }));

  //   this.subscriptions.add(this.sharedEventService.audClick$.subscribe(() => {
  //     this.showTablaAuditorias('auditoria');
  //   }));
  // }

  // ngOnDestroy() {
  //   this.subscriptions.unsubscribe();
  // }
  // showTablaUsuarios() {
  //   this.resetVisibility();
  //   this.tablaUsuVisible = true;
  // }

  // showTablaClientes() {
  //   this.resetVisibility();
  //   this.tablaCliVisible = true;
  // }

  // showTablaActividades() {
  //   this.resetVisibility();
  //   this.tablaActVisible = true;
  // }

  // showTablaAuditorias() {
  //   this.resetVisibility();
  //   this.tablaAudVisible = true;
  // }

  // private resetVisibility() {
  //   this.tablaUsuVisible = false;
  //   this.tablaCliVisible = false;
  //   this.tablaActVisible = false;
  //   this.tablaAudVisible = false;
  // }
}

