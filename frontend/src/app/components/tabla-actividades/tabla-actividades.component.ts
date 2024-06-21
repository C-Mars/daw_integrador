import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Subscription } from 'rxjs';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ActividadesService } from '../../services/actividades.service';
import { ActividadDto } from '../../dtos/Actividad.dto';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-tabla-actividades',
  standalone: true,
  imports: [
    TableModule,
    CardModule,
    CommonModule,
    ButtonModule,
    ToastModule,
    ConfirmDialogModule,
    TagModule,
    TooltipModule,
  ],
  templateUrl: './tabla-actividades.component.html',
  styleUrls: ['./tabla-actividades.component.scss'],
})
export class TablaActividadesComponent implements OnInit {
  actividades!: ActividadDto[];
  selectedActividad!: ActividadDto;
  displayEditDialog: boolean = false;
  displayNewDialog: boolean = false;

  constructor(
    private messageService: MessageService,
    private actividadesService: ActividadesService,
    private confirmacionService: ConfirmationService,
    private _route: Router
  ) {}

  ngOnInit() {
    this.cargarActividades();
  }

  cargarActividades() {
    this.actividadesService.getActividades().subscribe((data) => {
      this.actividades = data;
      console.log(data)
    });
  }

  eliminarActividad(id: number) {
    this.confirmacionService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta actividad?',
      accept: () => {
        this.actividadesService.eliminarActividad(id).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Actividad eliminada',
          });
          this.cargarActividades();
        });
      },
    });
  }

  editarActividad(actividad: ActividadDto) {
    this.selectedActividad = { ...actividad };
    this.displayEditDialog = true;
  }

  nuevo() {
    this.selectedActividad = {} as ActividadDto;
    this.displayNewDialog = true;
  }

  saveActividad() {
    if (this.selectedActividad.id) {
      this.actividadesService.editarActividad(this.selectedActividad).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Actividad actualizada',
        });
        this.cargarActividades();
        this.displayEditDialog = false;
      });
    } else {
      this.actividadesService.crearActividad(this.selectedActividad).subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Actividad creada',
        });
        this.cargarActividades();
        this.displayNewDialog = false;
      });
    }
  }

  cancel() {
    this.displayEditDialog = false;
    this.displayNewDialog = false;
  }
}
