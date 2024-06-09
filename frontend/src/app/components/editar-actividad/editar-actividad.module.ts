import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { EditarActividadComponent } from './editar-actividad.component';

@NgModule({
  declarations: [EditarActividadComponent],
  imports: [
    CommonModule,
    FormsModule,
    DialogModule,
    CalendarModule
  ],
  exports: [EditarActividadComponent]
})
export class EditarActividadModule { }
