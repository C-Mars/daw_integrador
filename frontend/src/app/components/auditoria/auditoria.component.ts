import { Component } from '@angular/core';
import { BaseComponent } from '../base/base.component';
import { NgFor, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { AuditoriaDto } from '../../dtos/dtos-auditoria/auditoria.dto';
import { MessageService, SelectItem } from 'primeng/api';
import { AuditoriaService } from '../../services/auditoria.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [BaseComponent,
    NgFor,
    NgIf,
    TableModule
  ],
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.scss'
})
export class AuditoriaComponent {
  auditorias!: AuditoriaDto[];
  columnas!: { field: string, header: string, filter?: boolean}[];
  opcionesDeFiltro!: SelectItem[];
  
  constructor(
    private auditoriaService: AuditoriaService,
    private messageService: MessageService,
    private router: Router
  ){}

  ngOnInit(){
    this.columnas = [
      { field: 'id', header: 'Id' },
      { field: 'idActividad', header: 'Id-Actividad'},
      { field: 'idCliente', header: 'Id-Cliente'},
      { field: 'descripcion', header: 'Descripción'},
      { field: 'encargado', header: 'Encargado'},
      { field: 'prioridad', header: 'Prioridad'},
      { field: 'última modificacion', header: 'Última modificación'},
      { field: 'iniciado', header: 'Iniciado' },
      { field: 'estado', header: 'Estado'},
      { field: 'operacion', header: 'Operación'}
    ];

    this.opcionesDeFiltro = [
      {
        value: 'startWith',
        label: 'Empieza con'
      },
      {
        value: 'contains',
        label: 'Contiene'
      }
    ];
    this.llenarTabla();
  }

  llenarTabla(){
    return this.auditoriaService.getAuditoria().subscribe({
      next: (res) =>{
        this.auditorias = res;
      },
      error: (err) =>{
        this.messageService.add({
          severity: 'error',
          summary: 'Ocurrió un error al recuperar los datos'
        });
      }
    });
  }
}
