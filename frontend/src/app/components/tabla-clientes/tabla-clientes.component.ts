import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-tabla-clientes',
  standalone: true,
  imports: [TableModule,
    CardModule],
  templateUrl: './tabla-clientes.component.html',
  styleUrl: './tabla-clientes.component.scss'
})
export class TablaClientesComponent {
 
  titulo: string = 'Cliente'
}
