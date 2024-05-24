import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';

import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { RegisterComponent } from '../register/register.component';
import { UsuarioDto } from '../../dtos/usuario.dto';



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
  listaUsuarios: UsuarioDto[] = [];
  usuarioSeleccionado: UsuarioDto | undefined;
  newRegiterVisible: boolean = false;
  editRegiterVisible: boolean = false;


  constructor(private _servicioUsuario: AuthService,
    private _route: Router
  
  ) { }

  ngOnInit(): void {

    this._servicioUsuario.getUsuarios().subscribe({
      next: (data: UsuarioDto[]) => {
        this.listaUsuarios = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  eliminar(id: number): void {
    alert(id);
  }

  // editar(id: number): void {
  //   this._route.navigate(['/usuarios', id]);
  // }

  informacion(item: UsuarioDto): void {
    this.usuarioSeleccionado = item;
  }
  nuevo() {
    this.newRegiterVisible = true;
  }

 editar(id: number): void {
    this.editRegiterVisible = true;
    alert(id);
  }
}
