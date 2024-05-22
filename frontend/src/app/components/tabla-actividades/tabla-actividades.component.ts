import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-tabla-actividades',
  standalone: true,
  imports: [TableModule,
    CardModule ],
  templateUrl: './tabla-actividades.component.html',
  styleUrl: './tabla-actividades.component.scss'
})
export class TablaActividadesComponent {
  titulo: string = 'Actividades'
}
