import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ActividadesService } from '../../services/actividades.service';

@Component({
  selector: 'app-eliminar-actividad',
  standalone: true,

  imports: [
    CommonModule,
    ConfirmDialogModule],
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
    this.actividadesService.eliminarActividad(this.actividadId).subscribe(() => {
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
