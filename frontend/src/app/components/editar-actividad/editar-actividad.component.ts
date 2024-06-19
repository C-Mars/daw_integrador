import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ActividadDto } from '../../dtos/Actividad.dto';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-editar-actividad',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    CalendarModule
  ],
  templateUrl: './editar-actividad.component.html',
  styleUrls: ['./editar-actividad.component.scss']
})
export class EditarActividadComponent {
  @Input() actividad!: ActividadDto;
  @Input() displayDialog!: boolean;
  @Output() refresh = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  constructor(private actividadesService: ActividadesService) { }

  save() {
    this.actividadesService.editarActividad(this.actividad).subscribe(() => {
      this.refresh.emit();
      this.closeDialog();
    });
  }

  cancel() {
    this.closeDialog();
  }

  private closeDialog() {
    this.displayDialog = false;
    this.close.emit();
  }
}
