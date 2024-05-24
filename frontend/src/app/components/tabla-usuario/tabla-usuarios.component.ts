import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { TableModule } from 'primeng/table';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from '../register/register.component';
import { UsuarioDto } from '../../dtos/usuario.dto';
import { MessageService } from 'primeng/api';
import { UsuariosService } from '../../services/usuarios.service';



@Component({
  selector: 'app-tabla-usuario',
  standalone: true,
  imports: [TableModule,CardModule,
    CommonModule,
    ButtonModule,
    NgIf,RegisterComponent
  ],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.scss'
})
export class TablaUsuariosComponent implements OnInit {

  titulo: string = 'Usuarios'
  usuarios!: UsuarioDto[];
  newRegiterVisible: boolean = false;
  accion!: string
  usuarioSeleccionado!: UsuarioDto | null;

  @Input('filaSeleccionada') filaSeleccionada!: any;
  @Output() filaSeleccionadaChange = new EventEmitter<any>();

  constructor(
    private _authService : AuthService,
    private _servicioUsuario: UsuariosService,
    private messageService: MessageService,
    private _route: Router
  
  ) { }

  ngOnInit(): void {
    this.llenarTabla();
  }

  llenarTabla() {
  this._servicioUsuario.getUsuarios().subscribe({
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

  eliminar(id: number): void {
    alert(id);
  }


  informacion(item: UsuarioDto): void {
    this.usuarioSeleccionado = item;
  }
  
  nuevo() {
    this.usuarioSeleccionado = null;
    this.accion = 'Crear';
    this.newRegiterVisible = true;
  }
  editar() {
    this.accion = 'Editar';
    this.newRegiterVisible = true;
  }
  seleccionar() {
    this.filaSeleccionadaChange.emit(this.filaSeleccionada);
  }
}