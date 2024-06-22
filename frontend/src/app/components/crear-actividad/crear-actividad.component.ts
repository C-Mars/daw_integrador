import { Component, Input, Output, EventEmitter } from '@angular/core';
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
