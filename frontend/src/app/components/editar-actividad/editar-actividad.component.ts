import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActividadDto } from '../../dtos/actividad.dto';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-editar-actividad',
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
    this.actividadesService.updateActividad(this.actividad).subscribe(() => {
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
