import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { MenuLateralAdminComponent } from '../menu-lateral-admin/menu-lateral-admin.component';

@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [BaseComponent,MenuLateralAdminComponent],
  templateUrl: './actividades-admin.component.html',
  styleUrl: './actividades-admin.component.scss'
})
export class ActividadesAdminComponent {

}
