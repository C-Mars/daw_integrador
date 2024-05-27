import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ClienteDto } from '../../dtos/cliente.dto';
import { RolesEnum } from '../../enums/roles.enum';
import { DialogModule } from 'primeng/dialog';

import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { ClientesService } from '../../services/clientes.service';

@Component({
  selector: 'app-eliminar-cliente',
  standalone: true,
  imports: [ConfirmDialogModule,
    ToastModule,
    DialogModule,
    NgIf
  ],
  templateUrl: './eliminar-cliente.component.html',
  styleUrl: './eliminar-cliente.component.scss'
})
export class EliminarClienteComponent {
  
  @Input({ required: true }) visible!: boolean;
  @Input({ required: false }) cliente!: ClienteDto | null;
  @Input({ required: true }) accion!: string;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() refrescar = new EventEmitter<boolean>();

  constructor(
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private _router: Router,
    private _clientesService: ClientesService) {}  
 
  
    eliminar() {
      if (!this.cliente || !this.cliente.id) {
        console.error('No se puede eliminar el cliente:', this.cliente);
        return;
      }
      
      this.confirmationService.confirm({
        header: 'Confirmación',
        message: '¿Estás seguro de que deseas eliminar este cliente?',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          if (this.cliente) { // Verificamos que usuario sea distinto de null
            this._clientesService.eliminar(this.cliente).subscribe({
              next: () => {
                this.cerrar();
                this.refrescar.emit(true);
                this.messageService.add({
                  severity: 'success',
                  summary: 'Cliente eliminado con éxito!',
                });
              },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Ocurrió un error al eliminar el cliente',
                });
              },
            });
          } else {
            console.error('El cliente vacio.');
          }
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Operación cancelada',
            detail: 'No se eliminó el cliente',
          });
        },
      });
    }

cerrar() {
  this.visibleChange.emit(false);
}

}