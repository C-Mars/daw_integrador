import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
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
     EliminarUsuarioComponent
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
 
  constructor(
    private messageService: MessageService,
    private _usuarioService: UsuariosService,
    private _route: Router
  
  ) { }

  ngOnInit(): void {
    this.llenarTabla();
  }

  llenarTabla() {
  this._usuarioService.getUsuarios().subscribe({
    next: (data: UsuarioDto[]) => {
      this.usuarios = data;
    },
    error: (err) => {
      this.messageService.add({
        severity: 'error',
        summary: 'Ocurrió un error al recuperar la lista de actividades',
      });
    },
  })
}

 


  
  nuevo() {
    this.usuarioSeleccionado = null;
    this.accion = 'Crear';
    this.newRegiterVisible = true;
  }
  editar() {
    this.accion = 'Editar';
    this.newEditVisible = true;
  }

 

informacion(item: UsuarioDto): void {
    this.usuarioSeleccionado = item;
}

eliminar() {
    if (!this.usuarioSeleccionado || !this.usuarioSeleccionado.id) {
        console.error('No se puede eliminar el usuario seleccionado:', this.usuarioSeleccionado);
        return;
    }
   
    this.newDeleteVisible = true;
}

}