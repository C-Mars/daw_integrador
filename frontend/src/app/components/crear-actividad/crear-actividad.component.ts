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

import { UsuariosService } from '../../services/usuarios.service';
import { response } from 'express';
import { MessageService } from 'primeng/api';
import { ClientesService } from '../../services/clientes.service';

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

  //prioridades = [ { label: 'Baja', value: PrioridadActividadEnum.BAJA }, { label: 'Media', value: PrioridadActividadEnum.MEDIA }, { label: 'Alta', value: PrioridadActividadEnum.ALTA }];
  //estados = [{ label: 'Pendiente', value: EstadoActividadEnum.PENDIENTE }, { label: 'En Proceso', value: EstadoActividadEnum.EN_PROCESO }, { label: 'Finalizada', value: EstadoActividadEnum.FINALIZADA },];
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
      id: new FormControl<number | null>(null),
      descripcion: new FormControl<string | null>('', Validators.required),
      idCliente: new FormControl<string | null>(null, Validators.required),
      idUsuarioActual:new FormControl<string | null>(null),
      idUsuarioModificacion: new FormControl<string | null>(null, Validators.required),
      prioridad: new FormControl<PrioridadActividadEnum | null>(PrioridadActividadEnum.BAJA, Validators.required),
      estado: new FormControl<EstadoActividadEnum | null>(EstadoActividadEnum.PENDIENTE, Validators.required),
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
    if (!this.actividadForm.valid) {
      this.actividadForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Debe ingresar todos los campos obligatorios',
      });
      return;
    }
      const actividad = this.actividadForm.getRawValue();
      
      const crearActividad: ActividadDto ={
        idCliente: actividad.idCliente!,
        descripcion:actividad.descripcion! ,
        prioridad:actividad.prioridad! ,
        estado: actividad.estado!,
        idUsuarioActual:actividad.idUsuarioActual! ,
        idUsuarioModificacion: actividad.idUsuarioModificacion!
      }

      this.actividadesService.crearActividad(crearActividad).subscribe({
        next: (response) => {
          this.displayDialog = false;
          this.displayDialogChange.emit(this.displayDialog);
          this.refresh.emit();
          this.close.emit();

        // Mensaje de actividad creada éxito
        this.messageService.add({
          severity:'success',
          summary:'ACTIVIDAD CREADA',
          detail:'A trabajar muchacho! que tenemos una nueva tarea'});
          life: 5000 // Duración del mensaje en milisegundos (5 segundos)
      },
        error: (error) => {
          console.error('Error al crear la actividad:', error);

          // Mensaje de error
          this.messageService.add({
            severity:'error',
            summary:'Error',
            detail:'Error al crear la actividad' + error.message});
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
