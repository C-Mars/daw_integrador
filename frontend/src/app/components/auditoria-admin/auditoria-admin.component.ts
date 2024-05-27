import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { TablaAuditoriaComponent } from '../tabla-auditoria/tabla-auditoria.component';

@Component({
  selector: 'app-auditoria-admin',
  standalone: true,
  imports: [BaseComponent,TablaAuditoriaComponent],
  templateUrl: './auditoria-admin.component.html',
  styleUrl: './auditoria-admin.component.scss'
})
export class AuditoriaAdminComponent {

}
