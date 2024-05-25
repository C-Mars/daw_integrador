import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { RolesEnum } from '../../enums/roles.enum';
import { EstadosUsuarioEnum } from '../../enums/estado-usuario.enum';
import { DialogModule } from 'primeng/dialog';
import { UsuariosService } from '../../services/usuarios.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-eliminar-usuario',
  standalone: true,
  imports: [ConfirmDialogModule,
    ToastModule,
    DialogModule,
    NgIf
  ],
  templateUrl: './eliminar-usuario.component.html',
  styleUrl: './eliminar-usuario.component.scss'
})
export class EliminarUsuarioComponent {
  
  @Input({ required: true }) visible!: boolean;
  @Input({ required: false }) usuario!: UsuarioDto | null;
  @Input({ required: true }) accion!: string;
  @Output() visibleChange = new EventEmitter<boolean>();
  @Output() refrescar = new EventEmitter<boolean>();

  constructor(
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private _router: Router,
    private _usuariosService: UsuariosService) {}  
 
  
    eliminar() {
      if (!this.usuario || !this.usuario.id) {
        console.error('No se puede eliminar el usuario:', this.usuario);
        return;
      }
      
      this.confirmationService.confirm({
        header: 'Confirmación',
        message: '¿Estás seguro de que deseas eliminar este usuario?',
        icon: 'pi pi-exclamation-triangle',
        acceptButtonStyleClass: 'p-button-outlined p-button-sm',
        accept: () => {
          if (this.usuario) { // Verificamos que usuario sea distinto de null
            this._usuariosService.eliminar(this.usuario).subscribe({
              next: () => {
                this.cerrar();
                this.refrescar.emit(true);
                this.messageService.add({
                  severity: 'success',
                  summary: 'Usuario eliminado con éxito!',
                });
              },
              error: (err) => {
                this.messageService.add({
                  severity: 'error',
                  summary: 'Ocurrió un error al eliminar el usuario',
                });
              },
            });
          } else {
            console.error('El usuario vacio.');
          }
        },
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Operación cancelada',
            detail: 'No se eliminó el usuario',
          });
        },
      });
    }

cerrar() {
  this.visibleChange.emit(false);
}

}