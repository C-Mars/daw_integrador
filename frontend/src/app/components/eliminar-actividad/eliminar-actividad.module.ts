import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { EliminarActividadComponent } from './eliminar-actividad.component';

@NgModule({
  declarations: [EliminarActividadComponent],
  imports: [
    CommonModule,
    ConfirmDialogModule
  ],
  exports: [EliminarActividadComponent]
})
export class EliminarActividadModule { }
