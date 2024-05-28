import { Component } from '@angular/core';
import { TablaClientesComponent } from '../tabla-cliente/tabla-clientes.component';
import { BaseComponent } from '../base/base.component';
import { TablaAuditoriaComponent } from '../tabla-auditoria/tabla-auditoria.component';

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
