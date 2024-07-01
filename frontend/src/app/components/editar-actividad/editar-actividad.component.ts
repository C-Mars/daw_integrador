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
import { EstadosActividadEnum } from '../../enums/estados-actividad.enum';
import { EditarActividadDto } from '../../dtos/editar-actividad.dto';
import { ClienteDto } from '../../dtos/cliente.dto';
import { UsuarioDto } from '../../dtos/usuario.dto';

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
    if (this.formEditarActividad) {
      this.formEditarActividad.patchValue(this._actividad);
    }
  }
  get actividad(): ActividadDto {
    return this._actividad;
  }

  actividades!: ActividadDto[];


  prioridades = Object.values(PrioridadActividadEnum).map(prioridad => ({ label: prioridad, value: prioridad }));
  estados = Object.values(EstadosActividadEnum).map(estado => ({ label: estado, value: estado }));
  clientes: any[] = [];
  usuarios: any[] = [];

  formEditarActividad = new FormGroup ({
  id: new FormControl<number | null>(null),
  descripcion: new FormControl<string | null>(null),
  idCliente: new FormControl<ClienteDto| null>(null),
  idUsuarioModificacion: new FormControl<UsuarioDto | null>(null),
  idUsuarioActual: new FormControl<UsuarioDto | null>(null),
  prioridad: new FormControl< PrioridadActividadEnum|null>(null),
  estado: new FormControl<EstadoActividadEnum|null>(null)})
  
  constructor(
    private actividadesService: ActividadesService,
    private clientesService: ClientesService,
    private usuariosService: UsuariosService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.actividadesService.getActividades().subscribe({
      next: (res) => {
        this.actividades = res;
        if (this.actividades.length > 0) {
          this.actividad = this.actividades[0];
          this.llenarTabla(); 
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Ocurrió un error al recuperar los usuarios'+ err.message,
        });
      },
    })
    
  }
  llenarTabla() {
    if (this.actividad) {
      this.formEditarActividad.patchValue({
        id: this.actividad.id,
        descripcion: this.actividad.descripcion,
        idCliente: this.actividad.idCliente,
        idUsuarioActual: this.actividad.idUsuarioActual,
        idUsuarioModificacion: this.actividad.idUsuarioModificacion,
        prioridad: this.actividad.prioridad,
        estado: this.actividad.estado,
      });
  
      this.clientes = [];
      if (this.actividad.idCliente) {
        this.clientes.push({ label: this.actividad.idCliente.nombres, value: this.actividad.idCliente });
      }
      this.clientesService.getClientes().subscribe({
        next:(clientes: any[]) => {
          this.clientes.push(...clientes.map(cliente => ({
            label: cliente.nombres,
            value: cliente
          })));
        },
        error: (error) => {
          console.error('Error al cargar los clientes:', error);
        }
      });
 
      this.usuarios = [];
      if (this.actividad.idUsuarioModificacion) {
        this.usuarios.push({ label: this.actividad.idUsuarioModificacion.nombres, value: this.actividad.idUsuarioModificacion });
      }
      this.usuariosService.getUsuarios().subscribe({
        next:(usuarios: any[]) => {
          this.usuarios.push(...usuarios.map(usuario => ({
            label: usuario.nombres,
            value: usuario
          })));
        },
        error: (error) => {
          console.error('Error al cargar los usuarios:', error);
        }
      });
  
    } else {
      this.formEditarActividad.reset();
    }
  }
  

  save() {
    if (!this.formEditarActividad.valid) {
      this.formEditarActividad.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Debe ingresar todos los campos',
      });
      return;
    }
    const actividad = this.formEditarActividad.getRawValue()
    const editarActividad: EditarActividadDto ={
      id:actividad.id!,
      idCliente: actividad.idCliente!,
      descripcion:actividad.descripcion! ,
      prioridad:actividad.prioridad! ,
      estado: actividad.estado!,
      idUsuarioActual:actividad.idUsuarioActual! ,
      idUsuarioModificacion: actividad.idUsuarioModificacion!
    } 

    this.actividadesService.editarActividad(editarActividad).subscribe({
        next: (response) => {
          // this.actividadChange.emit(actividad);
          this.displayDialog = false;
          this.displayDialogChange.emit(this.displayDialog);
          this.refresh.emit();
          this.close.emit();

          // Mensaje de actividad actualizada con éxito
          this.messageService.add({
            severity: 'success',
            summary: 'ACTIVIDAD ACTUALIZADA',
            detail: 'La actividad ha sido actualizada correctamente' ,
            life: 5000 // Duración del mensaje en milisegundos (5 segundos)
          });
        },
        error: (error) => {
          console.error('Error al actualizar la actividad:', error);

          // Mensaje de error
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar la actividad' + error.message
          });
        }
      });
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
