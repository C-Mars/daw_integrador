import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { TooltipModule } from 'primeng/tooltip';
import { AuditoriaDto } from '../../dtos/auditoria.dto';
import { AuditoriaService } from '../../services/auditoria.service';
import { ActividadesService } from '../../services/actividades.service';
import { ActividadDto } from '../../dtos/Actividad.dto';
import { NgForOf } from '@angular/common';
import { error } from 'node:console';
import { TagModule } from 'primeng/tag';


@Component({
  selector: 'app-tabla-auditoria',
  standalone: true,
  imports: [
    TableModule,
    CardModule,
    ButtonModule,
    TagModule,
    TooltipModule,
    NgForOf],
  templateUrl: './tabla-auditoria.component.html',
  styleUrl: './tabla-auditoria.component.scss'
})
export class TablaAuditoriaComponent implements OnInit {

  titulo: string = 'AUDITORIA';
  auditorias: AuditoriaDto[] = [];
  @ViewChild('dt', { static: false }) table!: Table;
  cols!: any[];
  exportColumns!: any[];
  actividades: ActividadDto[] = [];
  constructor(
    private auditoriaService: AuditoriaService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.cargarAuditorias();
    this.cols = [
      { field: 'actividadActual.id', header: 'Actividad' },
      { field: 'clienteActual.nombres', header: 'Cliente' },
      { field: 'descripcion', header: 'Descripción' },
      { field: 'usuarioActual.nombres', header: 'Administrador' },
      { field: 'prioridad', header: 'Prioridad' },
      { field: 'usuarioModificacion.nombres', header: 'Encargado' },
      { field: 'fechaModificacion', header: 'Última modificación' },
      { field: 'fechaInicio', header: 'Fecha de creación' },
      { field: 'estado', header: 'Estado' },
      { field: 'operacion', header: 'Operación' }
    ];

    this.exportColumns = this.cols.map(col => ({
      title: col.header,
      dataKey: col.field
    }));
  }
  cargarAuditorias() {
    this.auditoriaService.getTodasAuditorias().subscribe({
      next: (data) => {
      this.auditorias = data
      },
      error: (err) => {
                    this.messageService.add({
                      severity: 'error',
                      summary: 'Error al recuperar auditorías',
                      detail: `No se pudieron cargar las auditorías para las actividades`
                    });
                  }
      ,})
    }
  

  exportarCSV(): void {
    if (this.auditorias && this.auditorias.length > 0) {
      try {
        this.table.exportCSV();
      } catch (error) {
        this.messageService.add({
          severity: 'error',
          summary: 'Error al exportar a CSV',
          detail: 'Ocurrió un error al intentar exportar los datos a CSV.'
        });
      }
    } else {

      this.messageService.add({
        severity: 'warn',
        summary: 'No hay datos para exportar',
        detail: 'No se pueden exportar datos vacíos.'
      });
    }
  }

getSeverityPrioridad(rol: string){
  switch (rol){
    case 'alta':
      return 'danger';
    case 'media':
      return 'warning';
    case 'baja':
      return 'info';
    default:
      return 'contrast';
  }
}

getSeverityEstado(rol: string){
  switch (rol){
    case 'pendiente':
      return 'info';
    case 'en proceso':
      return 'secondary';
    case 'finalizado':
      return 'warning';
    case 'eliminado':
      return 'danger'
    default:
      return 'contrast'
  }
}



getSeverityOperacion(rol: string){
  switch (rol){
    case 'creación':
      return 'success';
    case 'modificación':
      return 'warning';
    case 'eliminación':
      return 'danger';
    default:
      return 'contrast'
  }
}

}

