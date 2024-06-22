import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActividadDto } from '../../dtos/Actividad.dto';
import { ActividadesService } from '../../services/actividades.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators,} from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
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
  selector: 'app-editar-actividad',
  standalone: true,
  imports: [
    CardModule,
    ToastModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule,
    DialogModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './editar-actividad.component.html',
  styleUrl: './editar-actividad.component.scss',
})
export class EditarActividadComponent {
  @Input() actividad!: ActividadDto;
  @Output() actividadChange = new EventEmitter<ActividadDto>();
  @Input() displayDialog: boolean = false;
  @Output() displayDialogChange = new EventEmitter<boolean>();

  @Output() refresh = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  constructor(private actividadesService: ActividadesService) {}

  save() {
    this.actividadesService
      .actualizarActividad(this.actividad)
      .subscribe(() => {
        this.refresh.emit();
        this.closeDialog();
      });
  }

  cancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.displayDialog = false;
    this.displayDialogChange.emit(this.displayDialog);
    this.close.emit();
  }

  onActividadChange() {
    this.actividadChange.emit(this.actividad);
  }
}
