/*import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,} from "@angular/forms";
import { DialogModule } from 'primeng/dialog';
import { ActividadDto } from '../../dtos/Actividad.dto';
import { ActividadesService } from '../../services/actividades.service';
import { PrioridadActividadEnum } from '../../enums/prioridad-actividad.enum';
import { EstadoActividadEnum } from '../../enums/estado-actividad.enum';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-crear-actividad',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FloatLabelModule,
    CardModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './crear-actividad.component.html',
  styleUrls: ['./crear-actividad.component.scss']
})
export class CrearActividadComponent {
  @Input() displayDialog: boolean = false;
  @Output() displayDialogChange = new EventEmitter<boolean>();
  @Output() refresh = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  actividad: ActividadDto = {
    id: 0,
    descripcion: '',
    idCliente: 0,
    idUsuarioActual: 0,
    prioridad: PrioridadActividadEnum.BAJA,
    estado: EstadoActividadEnum.EN_PROCESO,
    idUsuarioModificacion: 0,
    fechaModificacion: new Date(),
    fechaInicio: new Date()
  };

  constructor(private actividadesService: ActividadesService) {}

  save() {
    this.actividadesService.crearActividad(this.actividad).subscribe(() => {
      this.refresh.emit();
      this.closeDialog();
    });
  }

  cancel() {
    this.closeDialog();
  }

  closeDialog() {
    this.displayDialog = false;
    this.displayDialogChange.emit(this.displayDialog);
    this.close.emit();
  }
}
  */
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { DialogModule } from 'primeng/dialog';
import { ActividadDto } from '../../dtos/Actividad.dto';
import { ActividadesService } from '../../services/actividades.service';
import { PrioridadActividadEnum } from '../../enums/prioridad-actividad.enum';
import { EstadoActividadEnum } from '../../enums/estado-actividad.enum';
import { CardModule } from 'primeng/card';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { ClientesService } from '../../services/clientes.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-crear-actividad',
  standalone: true,
  imports: [
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    ToastModule,
    FloatLabelModule,
    CardModule,
    DropdownModule,
    FormsModule
  ],
  templateUrl: './crear-actividad.component.html',
  styleUrl: './crear-actividad.component.scss'
})
export class CrearActividadComponent implements OnInit {
  @Input() displayDialog: boolean = false;
  @Output() displayDialogChange = new EventEmitter<boolean>();
  @Output() refresh = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  actividadForm: FormGroup;

  prioridades = [
    { label: 'Baja', value: PrioridadActividadEnum.BAJA },
    { label: 'Media', value: PrioridadActividadEnum.MEDIA },
    { label: 'Alta', value: PrioridadActividadEnum.ALTA }
  ];

  estados = [
    { label: 'Pendiente', value: EstadoActividadEnum.PENDIENTE },
    { label: 'En Proceso', value: EstadoActividadEnum.EN_PROCESO },
    { label: 'Finalizada', value: EstadoActividadEnum.FINALIZADA },
  ];

  clientes: any[] = [];
  usuarios: any[] = [];

  constructor(
    private actividadesService: ActividadesService,
    private clientesService: ClientesService,
    private usuariosService: UsuariosService
  ) {
    this.actividadForm = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      idCliente: new FormControl(null, Validators.required),
      idUsuarioActual: new FormControl(null, Validators.required),
      prioridad: new FormControl(PrioridadActividadEnum.BAJA, Validators.required),
      estado: new FormControl(EstadoActividadEnum.PENDIENTE, Validators.required),
      //fechaInicio: new FormControl(new Date(), Validators.required)
    });
  }

  ngOnInit() {
    this.cargarClientes();
    this.cargarUsuarios();
  }

  cargarClientes() {
    this.clientesService.getClientes().subscribe(
      (clientes: any[]) => {
        this.clientes = clientes.map(cliente => ({
          label: cliente.nombres,
          value: cliente.id
        }));
      },
      error => {
        console.error('Error al cargar los clientes:', error);
      }
    );
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe(
      (usuarios: any[]) => {
        this.usuarios = usuarios.map(usuario => ({
          label: usuario.nombres,
          value: usuario.id
        }));
      },
      error => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  save() {
    if (this.actividadForm.valid) {
      const actividad: ActividadDto = this.actividadForm.value;
      actividad.fechaInicio = new Date(); // Asigna la fecha actual del sistema
      actividad.idUsuarioModificacion = 1;  // Supongamos que el usuario ADMINISTRADOR tiene el ID 1

      this.actividadesService.crearActividad(actividad).subscribe(
        response => {
          this.displayDialog = false;
          this.displayDialogChange.emit(this.displayDialog);
          this.refresh.emit();
          this.close.emit();
        },
        error => {
          console.error('Error al guardar la actividad:', error);
        }
      );
    } else {
      console.error('Formulario no válido');
    }
  }

  cancel() {
    this.displayDialog = false;
    this.displayDialogChange.emit(this.displayDialog);
    this.close.emit();
  }

  closeDialog() {
    this.displayDialog = false;
    this.displayDialogChange.emit(this.displayDialog);
    this.close.emit();
  }
}


