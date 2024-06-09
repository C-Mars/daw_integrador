import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ActividadesService } from '../../services/actividades.service';
import { ActividadDto } from '../../dtos/actividad.dto';

@Component({
  selector: 'app-tabla-actividades',
  templateUrl: './tabla-actividades.component.html',
  styleUrls: ['./tabla-actividades.component.scss'],
  providers: [MessageService]
})
export class TablaActividadesComponent implements OnInit {
  actividades: ActividadDto[] = [];
  displayDialog: boolean = false;
  actividad: ActividadDto = new ActividadDto();
  titulo: string = 'ACTIVIDADES';

  constructor(private actividadesService: ActividadesService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadActividades();
  }

  loadActividades() {
    this.actividadesService.getActividades().subscribe(data => {
      this.actividades = data;
    });
  }

  onEdit(actividad: ActividadDto) {
    this.actividad = { ...actividad };
    this.displayDialog = true;
  }

  onDelete(actividad: ActividadDto) {
    this.actividadesService.deleteActividad(actividad.id).subscribe(() => {
      this.loadActividades();
      this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Actividad eliminada' });
    });
  }

  save() {
    if (this.actividad.id) {
      this.actividadesService.updateActividad(this.actividad).subscribe(() => {
        this.loadActividades();
        this.displayDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Actividad actualizada' });
      });
    } else {
      this.actividadesService.createActividad(this.actividad).subscribe(() => {
        this.loadActividades();
        this.displayDialog = false;
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Actividad creada' });
      });
    }
  }

  nuevo() {
    this.actividad = new ActividadDto();
    this.displayDialog = true;
  }
}
