import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tabla-actividades-usuario',
  standalone: true,
  imports: [CardModule,TableModule],
  templateUrl: './tabla-actividades-usuario.component.html',
  styleUrl: './tabla-actividades-usuario.component.scss'
})
export class TablaActividadesUsuarioComponent {
  titulo: string = 'ACTIVIDADES EJECUTOR'
}
