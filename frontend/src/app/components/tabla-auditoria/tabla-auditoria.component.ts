import { Component, OnInit, ViewChild } from '@angular/core';
import { Table, TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { AuditoriaDto } from '../../dtos/auditoria.dto';
import { AuditoriaService } from '../../services/auditoria.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-tabla-auditoria',
  standalone: true,
  imports: [TableModule,
    CardModule],
  templateUrl: './tabla-auditoria.component.html',
  styleUrl: './tabla-auditoria.component.scss'
})
export class TablaAuditoriaComponent implements OnInit {

  titulo: string = 'Auditoria'
  auditorias: AuditoriaDto[]= [];

  constructor(private auditoriaService: AuditoriaService,
    private messageService: MessageService

  ){}
  
  ngOnInit(): void {
    

    this.loadAuditorias();
  }



  loadAuditorias(){
    return this.auditoriaService.getAuditoriaActividad().subscribe({
      next: (res) =>{
        this.auditorias = res;
      },
      error: (err) =>{
        this.messageService.add({
          severity: 'error',
          summary: 'Ocurrió un error al recuperar los datos'
        });
      }
    });
  }

}
