import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { TablaActividadesUsuarioComponent } from '../tabla-actividades-usuario/tabla-actividades-usuario.component';

@Component({
  selector: 'app-actividades-usuarios',
  standalone: true,
  imports: [BaseComponent,
    TablaActividadesUsuarioComponent],
  templateUrl: './actividades-usuarios.component.html',
  styleUrl: './actividades-usuarios.component.scss'
})
export class ActividadesUsuariosComponent {

}
