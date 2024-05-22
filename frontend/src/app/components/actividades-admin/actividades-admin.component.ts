import { Component, OnDestroy, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { MenuLateralAdminComponent } from '../menu-lateral-admin/menu-lateral-admin.component';
import { TablaUsuariosComponent } from '../tabla-usuario/tabla-usuarios.component';
import { NgIf } from '@angular/common';

import { Subscription } from 'rxjs';
import { SharedEventService } from '../../services/shared-event.service';

@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [BaseComponent,
    MenuLateralAdminComponent,
    TablaUsuariosComponent,
  NgIf],
  templateUrl: './actividades-admin.component.html',
  styleUrl: './actividades-admin.component.scss'
})
export class ActividadesAdminComponent implements OnInit, OnDestroy {
  tablaUsuVisible: boolean = false;
  
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
}