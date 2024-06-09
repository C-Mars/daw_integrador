import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from '../register/register.component';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { MessageService,  ConfirmationService } from 'primeng/api';
import { UsuariosService } from '../../services/usuarios.service';
import { EditarUsarioComponent } from '../editar-usario/editar-usario.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-tabla-usuario',
  standalone: true,
  imports: [TableModule,
    CardModule,
    CommonModule,
    ButtonModule,
    NgIf,
    RegisterComponent,
    EditarUsarioComponent,
    ToastModule,
    ConfirmDialogModule,
    AvatarModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.scss'
})
export class TablaUsuariosComponent implements OnInit {

  titulo: string = 'USUARIOS'
  usuarios!: UsuarioDto[];
  newRegiterVisible: boolean = false;
  newEditVisible: boolean = false;
  newDeleteVisible: boolean = false;
  accion!: string
  usuarioSeleccionado!: UsuarioDto | null;
  imagenSrc: string | null = null;
 

  private readonly platformId = inject(PLATFORM_ID);
 

  constructor(
    private messageService: MessageService,
    private _usuarioService: UsuariosService,
    private confirmacionService:  ConfirmationService,
    private _route: Router
  ) { }

  ngOnInit(): void {
   
    this.llenarTabla();

  }

  
  llenarTabla(): void {
    const sub = this._usuarioService.getUsuarios()
    .subscribe({
      next: (data: UsuarioDto[]) => {
        this.usuarios = data;
        data.forEach(usuario => {
          this.cargarFotoUsuario(usuario);
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Ocurrió un error al recuperar la lista de usuarios: ' + err,
        });
      }
    });
  }
 

  cargarFotoUsuario(usuario: UsuarioDto): void {
    this._usuarioService.getFotoUsuario(usuario).subscribe({
      next: (blob) => {
        if (blob) {
          const obFotoURL = URL.createObjectURL(blob);
          usuario.foto = obFotoURL; 
        } else {
          console.error('El Blob es nulo');
        }
      },
      error: (error) => {
        console.error('Error al cargar la foto del usuario:', error);
      }
    });
  }
   
  
nuevo() {
    this.usuarioSeleccionado = null;
    this.accion = 'Crear';
    this.newRegiterVisible = true;
  }


editar(item: UsuarioDto): void {
  this.accion = 'Editar';
  this.usuarioSeleccionado = item;
   
    if (this.usuarioSeleccionado.foto) {
      this.imagenSrc = this.usuarioSeleccionado.foto;
  } else {
      this.imagenSrc = null;
  }
  this.newEditVisible = true;
}

eliminar(item: UsuarioDto): void {
  this.usuarioSeleccionado = item;
  this.confirmacionService.confirm({
    header: '¿Estás seguro?',
    message: `Confirme si desea eliminar a ${item.apellidos}, ${item.nombres}.`,
    accept: () => {
      this._usuarioService.eliminar(item.id).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Confirmado',
            detail: `Se ha eliminado a ${item.apellidos}, ${item.nombres}`,
          });
          this.llenarTabla();
        },
        error: (error) => {
          console.error('Error al eliminar el usuario:', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudo eliminar el usuario'
          });
          
        }
      });
    },
    reject: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Cancelado',
        detail: ''
      });
    }
  });
  
}

getSeverityEstado(rol: string) {
  switch (rol) {
      case 'activo':
          return 'success';
      case 'baja':
          return 'danger';
          default:
            return 'contrast';
  }
}

getSeverityRol(rol: string)  {
 
  switch (rol) {
      case 'administrador':
          return 'info';
      case 'ejecutor':
          return 'warning';
      default:
            return 'contrast'; 
  }
}
}