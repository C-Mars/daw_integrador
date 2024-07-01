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
import { EditarActividadDto } from '../../dtos/editar-actividad.dto';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editar-actividad-usuarios',
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
    FormsModule,
    CommonModule,
  ],
  templateUrl: './editar-actividad-usuarios.component.html',
  styleUrls: ['./editar-actividad-usuarios.component.scss']
})
export class EditarActividadUsuariosComponent implements OnInit {
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
  estados = Object.values(EstadoActividadEnum).map(estado => ({ label: estado, value: estado }));

  constructor(
    private actividadesService: ActividadesService,
    private clientesService: ClientesService,
    private usuariosService: UsuariosService,
    private messageService: MessageService
  ) {
    this.actividadForm = new FormGroup({
      descripcion: new FormControl('', Validators.required),
      estado: new FormControl(EstadoActividadEnum.PENDIENTE, Validators.required),
    });
  }

  ngOnInit(): void {
    if (this._actividad) {
      this.actividadForm.patchValue(this._actividad);
    }
  }

  save() {
    console.log('Valores a enviar:', this.actividad);

    if (this.actividadForm.valid) {
      const actividadToUpdate: EditarActividadDto = {
        id: this.actividad.id,
        descripcion: this.actividadForm.get('descripcion')?.value || '', // Valor predeterminado
        estado: this.actividadForm.get('estado')?.value || '', // Valor predeterminado

        prioridad: this.actividad.prioridad || PrioridadActividadEnum.BAJA,
        idCliente: this._actividad.idCliente,
        idUsuarioActual: this._actividad.idUsuarioActual,
        idUsuarioModificacion: this._actividad.idUsuarioModificacion,
      };

      console.log('JSON a enviar:', JSON.stringify(actividadToUpdate));

      this.actividadesService.editarActividad(actividadToUpdate).subscribe({
        next: () => {
          this.actividadChange.emit(this.actividad);
          this.displayDialog = false;
          this.displayDialogChange.emit(this.displayDialog);
          this.refresh.emit();
          this.close.emit();

          this.messageService.add({
            severity: 'success',
            summary: 'ACTIVIDAD ACTUALIZADA',
            detail: 'La actividad ha sido actualizada correctamente',
            life: 5000
          });
        },
        error: (error: { message: string }) => {
          console.error('Error al actualizar la actividad:', error);

          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Error al actualizar la actividad: ' + error.message
          });
        }
      });
    } else {
      console.error('Formulario no válido');
      this.markFormGroupTouched(this.actividadForm);
      this.messageService.add({
        severity: 'warn',
        summary: 'Formulario no válido',
        detail: 'Por favor, revise los campos del formulario',
        life: 5000
      });
    }
  }

  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  cancel() {
    this.displayDialog = false;
  }

  closeDialog() {
    this.displayDialog = false;
  }
}
