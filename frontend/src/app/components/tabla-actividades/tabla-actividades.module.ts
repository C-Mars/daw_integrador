import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';

import { TablaActividadesComponent } from './tabla-actividades.component';

@NgModule({
  declarations: [TablaActividadesComponent],
  imports: [
    CommonModule,
    FormsModule,
    TableModule,
    ButtonModule,
    CalendarModule,
    CardModule,
    DialogModule,
    ToastModule
  ],
  exports: [TablaActividadesComponent]
})
export class TablaActividadesModule {}
