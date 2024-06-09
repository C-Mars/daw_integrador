import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-tabla-auditoria',
  standalone: true,
  imports: [TableModule,
    CardModule],
  templateUrl: './tabla-auditoria.component.html',
  styleUrl: './tabla-auditoria.component.scss'
})
export class TablaAuditoriaComponent {

  titulo: string = 'Auditoria'
  
}
