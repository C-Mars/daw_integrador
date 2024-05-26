import { Component } from '@angular/core';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { AuditoriaDto } from '../../dtos/dtos-auditoria/auditoria.dto';
import { environment } from '../../environments/environment';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { AuditoriaService } from '../../services/auditoria.service';

@Component({
  selector: 'app-tabla-auditoria',
  standalone: true,
  imports: [TableModule,
    CardModule],
  templateUrl: './tabla-auditoria.component.html',
  styleUrl: './tabla-auditoria.component.scss'
})
export class TablaAuditoriaComponent {

  titulo: string = 'Auditoria'
  auditorias!: AuditoriaDto[];
  accion!: string;

  subscription!: Subscription[]; 

  urlApi: string = environment.apiUrl

  constructor(
    private messageService: MessageService,
    private auditoriaService: AuditoriaService
  ){}

  ngOnIninit(): void{
    this.subscription = [];
    this.llenarTabla();
  }

  ngOnDestroy(): void{
    this.subscription.forEach(sub => sub.unsubscribe());
  }

  llenarTabla(): void{
    const sub = this.auditoriaService.getAuditoria().subscribe({
      next: (data: AuditoriaDto[]) =>{
        this.auditorias = data;
      },
      error: (err) =>{
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ha ocurrido un error al cargar las auditorias'
        });
      }
    });
    this.subscription.push(sub);
  }
   

}
