import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { ActividadesService } from '../../services/actividades.service';
import { ActividadDto } from '../../dtos/Actividad.dto';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EliminarActividadComponent } from '../eliminar-actividad/eliminar-actividad.component';
import { CrearActividadComponent } from '../crear-actividad/crear-actividad.component';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,} from "@angular/forms";
import { DialogModule } from 'primeng/dialog';
import { PrioridadActividadEnum } from '../../enums/prioridad-actividad.enum';
import { EstadoActividadEnum } from '../../enums/estado-actividad.enum';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { EditarActividadComponent } from '../editar-actividad/editar-actividad.component';

@Component({
  selector: 'app-tabla-actividades',
  standalone: true,
  imports: [ 
    TableModule,
    CardModule,
    CommonModule,
    ButtonModule,
    NgIf,
    ToastModule,
    ConfirmDialogModule,
    TagModule,
    TooltipModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    FloatLabelModule,
    DropdownModule,
    FormsModule,
    EditarActividadComponent,
    TablaActividadesComponent,
    CrearActividadComponent
  ],
  templateUrl: './tabla-actividades.component.html',
  styleUrl: './tabla-actividades.component.scss',
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
      this.actividades = data;})
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
        return 'success';
      case 'en proceso':
        return 'info';
      case 'finalizada':
        return 'danger';
      default:
        return 'contrast'
    }
  }
}
