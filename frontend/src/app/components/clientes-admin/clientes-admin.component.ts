import { Component } from '@angular/core';

import { BaseComponent } from '../base/base.component';
import { TablaAuditoriaComponent } from '../tabla-auditoria/tabla-auditoria.component';
import { TablaClientesComponent } from '../tabla-clientes/tabla-clientes.component';

@Component({
  selector: 'app-clientes-admin',
  standalone: true,
  imports: [BaseComponent,
    TablaClientesComponent, 
    TablaAuditoriaComponent],
  templateUrl: './clientes-admin.component.html',
  styleUrl: './clientes-admin.component.scss'
})
export class ClientesAdminComponent {

}
