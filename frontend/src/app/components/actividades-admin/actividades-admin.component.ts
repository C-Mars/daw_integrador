<<<<<<< HEAD
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [BaseComponent],
  templateUrl: './actividades-admin.component.html',
  styleUrl: './actividades-admin.component.scss'
})
export class ActividadesAdminComponent {

}
=======
import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { MenuLateralAdminComponent } from '../menu-lateral-admin/menu-lateral-admin.component';
import { TablaUsuariosComponent } from '../tabla-usuario/tabla-usuarios.component';

@Component({
  selector: 'app-actividades-admin',
  standalone: true,
  imports: [BaseComponent,MenuLateralAdminComponent,TablaUsuariosComponent],
  templateUrl: './actividades-admin.component.html',
  styleUrl: './actividades-admin.component.scss'
})
export class ActividadesAdminComponent {

}
>>>>>>> e6b539547a53cba9e96ad508ff8f36c25836bd4d
