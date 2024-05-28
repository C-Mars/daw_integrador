import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from '../register/register.component';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { MessageService } from 'primeng/api';
import { UsuariosService } from '../../services/usuarios.service';
import { EditarUsarioComponent } from '../editar-usario/editar-usario.component';
import { EliminarUsuarioComponent } from '../eliminar-usuario/eliminar-usuario.component';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { AvatarModule } from 'primeng/avatar';


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
    EliminarUsuarioComponent,
    ToastModule,
     ConfirmDialogModule,
     EliminarUsuarioComponent,
AvatarModule
  ],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.scss'
})
export class TablaUsuariosComponent implements OnInit {

  titulo: string = 'Usuarios'
  usuarios!: UsuarioDto[];
  newRegiterVisible: boolean = false;
  newEditVisible: boolean = false;
  newDeleteVisible: boolean = false;
  accion!: string
  usuarioSeleccionado!: UsuarioDto | null;
  imagenSrc: string | null = null;
  private readonly platformId = inject(PLATFORM_ID);
   
  subscriptions!: Subscription[];

  

  urlApi:string  = environment.apiUrl

  constructor(
    private messageService: MessageService,
    private _usuarioService: UsuariosService,
    private _route: Router
  ) { }

  ngOnInit(): void {
    this.subscriptions = [];
    this.llenarTabla();
  }

  ngOnDestroy(): void {
    // Desuscribirse de todos los observables al destruir el componente
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  llenarTabla(): void {
    const sub = this._usuarioService.getUsuarios().subscribe({
      next: (data: UsuarioDto[]) => {
        this.usuarios = data;
        this.usuarios.forEach(usuario => {
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
    this.subscriptions.push(sub); // Guardar la suscripción
  }
 
  cargarFotoUsuario(usuario: UsuarioDto): void {
    const sub = this._usuarioService.getFotoUsuario(`${usuario.id}`).subscribe({
      next: (blob) => {
        const objectURL = URL.createObjectURL(blob);
        usuario.foto = objectURL; // Asignar la URL al usuario específico
      },
      error: (error) => {
        console.error('Error al cargar la foto del usuario:', error);
      }
    });
    this.subscriptions.push(sub); // Guardar la suscripción
  }

  nuevo() {
    this.usuarioSeleccionado = null;
    this.accion = 'Crear';
    this.newRegiterVisible = true;
  }


editar(item: UsuarioDto): void {
  this.accion = 'Editar';
<<<<<<< Updated upstream
  this.usuarioSeleccionado = item;
=======
    this.usuarioSeleccionado = item;
>>>>>>> Stashed changes
   
    if (this.usuarioSeleccionado.foto) {
      this.imagenSrc = this.usuarioSeleccionado.foto;
  } else {
      this.imagenSrc = null;
  }
  this.newEditVisible = true;
}

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
eliminar(item: UsuarioDto): void  {
  this.usuarioSeleccionado = item;
  if (!this.usuarioSeleccionado || !this.usuarioSeleccionado.id) {
    console.error('No se puede eliminar el usuario seleccionado:', this.usuarioSeleccionado);
    return;
}
   
   alert(item.nombres)
   this.newDeleteVisible = true;
}

}