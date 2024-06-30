import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
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
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms'

@Component({
  selector: 'app-editar-actividad',
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
  templateUrl: './editar-actividad.component.html',
  styleUrl: './editar-actividad.component.scss'
})
export class EditarActividadComponent implements OnInit {
  @Input() displayDialog: boolean = false;
  @Output() actividadChange = new EventEmitter<ActividadDto>();
  @Output() displayDialogChange = new EventEmitter<boolean>();
  @Output() refresh = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  private _actividad!: ActividadDto;
  @Input()
  set actividad(value: ActividadDto) {
    this._actividad = value;
    if (this.actividadForm) {
      this.actividadForm.patchValue(this._actividad);
    }
  }
  get actividad(): ActividadDto {
    return this._actividad;
  }

  actividadForm: FormGroup;

  prioridades = Object.values(PrioridadActividadEnum).map(prioridad => ({ label: prioridad, value: prioridad }));
  estados = Object.values(EstadoActividadEnum).map(estado => ({ label: estado, value: estado }));

  clientes: any[] = [];
  usuarios: any[] = [];

  constructor(
    private actividadesService: ActividadesService,
    private clientesService: ClientesService,
    private usuariosService: UsuariosService,
    private messageService: MessageService
  ) {
    this.actividadForm = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      idCliente: new FormControl(null, Validators.required),
      idUsuarioActual: new FormControl(null, Validators.required),
      prioridad: new FormControl(PrioridadActividadEnum.BAJA, Validators.required),
      estado: new FormControl(EstadoActividadEnum.PENDIENTE, Validators.required)
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
      const actividad: ActividadDto = { ...this.actividad, ...this.actividadForm.value };
      actividad.idUsuarioModificacion = 1;  // Supongamos que el usuario ADMINISTRADOR tiene el ID 1

      this.actividadesService.editarActividad(actividad).subscribe({
        next: (response) => {
          this.actividadChange.emit(actividad);
          this.displayDialog = false;
          this.displayDialogChange.emit(this.displayDialog);
          this.refresh.emit();
          this.close.emit();

          // Mensaje de actividad actualizada con éxito
          this.messageService.add({
            severity: 'success',
            summary: 'ACTIVIDAD ACTUALIZADA',
            detail: 'La actividad ha sido actualizada correctamente',
            life: 5000 // Duración del mensaje en milisegundos (5 segundos)
          });
        },
        error: (error) => {
          console.error('Error al actualizar la actividad:', error);

          // Mensaje de error
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar la actividad'
          });
        }
      });
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
