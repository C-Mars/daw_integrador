import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-eliminar-actividad',
  templateUrl: './eliminar-actividad.component.html',
  styleUrls: ['./eliminar-actividad.component.scss']
})
export class EliminarActividadComponent {
  @Input() actividadId!: number;
  @Input() displayDialog!: boolean;
  @Output() refresh = new EventEmitter<void>();
  @Output() close = new EventEmitter<void>();

  constructor(private actividadesService: ActividadesService) { }

  confirmDelete() {
    this.actividadesService.deleteActividad(this.actividadId).subscribe(() => {
      this.refresh.emit();
      this.closeDialog();
    });
  }

  rejectDelete() {
    this.closeDialog();
  }

  private closeDialog() {
    this.displayDialog = false;
    this.close.emit();
  }

  onDialogHide() {
    this.displayDialog = false;
  }
}
