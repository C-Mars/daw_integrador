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
import { FormControl, FormGroup, ReactiveFormsModule, Validators,} from "@angular/forms";
import { DialogModule } from 'primeng/dialog';
import { PrioridadActividadEnum } from '../../enums/prioridad-actividad.enum';
import { EstadoActividadEnum } from '../../enums/estado-actividad.enum';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { EditarActividadUsuariosComponent } from '../editar-actividad-usuarios/editar-actividad-usuarios.component';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-tabla-actividades-usuarios',
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
    EditarActividadUsuariosComponent,
    TablaActividadesUsuariosComponent,
    
  ],
  templateUrl: './tabla-actividades-usuarios.component.html',
  styleUrl: './tabla-actividades-usuarios.component.scss',
})
export class TablaActividadesUsuariosComponent implements OnInit {
  actividades!: ActividadDto[];
  selectedActividad!: ActividadDto;
  displayEditDialog: boolean = false;
  displayNewDialog: boolean = false;
  loading: boolean = false;
  userId: number | undefined;
  usuarioLogueado: string | null = null;
  actividadesPendientesUsuario: ActividadDto[] | undefined;
  
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
    this.loading = true;

    const token = sessionStorage.getItem('token');
    if (!token) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Token de sesión no encontrado' });
      this.loading = false;
      return;
    }

    const decodedToken = new JwtHelperService().decodeToken(token);
    this.userId = decodedToken?.sub;

    if (!this.userId) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'ID de usuario no encontrado en el token' });
      this.loading = false;
      return;
    }

    this.actividadesService.getActividadPorUsuario(this.userId).subscribe(
      actividades => {
        // Aquí tienes acceso a las actividades pendientes del usuario
        console.log('Actividades pendientes del usuario:', actividades);
        // Puedes asignarlas a una propiedad en tu componente para mostrarlas en la interfaz
        this.actividadesPendientesUsuario = actividades;
        this.actividades = actividades;
      },
      error => {
        console.error('Error al obtener actividades pendientes del usuario:', error);
        // Manejo de errores si es necesario
      }
    );


  }

  editarActividad(actividad: ActividadDto) {
    this.selectedActividad = { ...actividad };
    this.displayEditDialog = true;
  }
 


  cancel() {
    this.displayEditDialog = false;
    this.displayNewDialog = false;
  }


 // Método para obtener la severidad (color) según la prioridad
 getSeverityPrioridad(prioridad: string): 'success' | 'info' | 'danger' | 'contrast' {
  switch (prioridad.toLowerCase()) {
    case PrioridadActividadEnum.ALTA.toLowerCase():
      return 'danger'; // (rojo)
    case PrioridadActividadEnum.MEDIA.toLowerCase():
      return 'info';   // (azul)
    case PrioridadActividadEnum.BAJA.toLowerCase():
      return 'success'; // (verde)
    default:
      return 'contrast'; // Valor por defecto o para cualquier otro caso
  }
}


// Método para obtener la severidad (color) según el estado
getSeverityEstado(estado: string): 'success' | 'info' | 'danger' | 'contrast' {
  switch (estado.toLowerCase()) {
    case EstadoActividadEnum.PENDIENTE.toLowerCase():
      return 'danger';
    case EstadoActividadEnum.EN_PROCESO.toLowerCase():
      return 'info';
    case EstadoActividadEnum.FINALIZADO.toLowerCase():
      return 'success';
    default:
      return 'contrast';
  }
}
}
