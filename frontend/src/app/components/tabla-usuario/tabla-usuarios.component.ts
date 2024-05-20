import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IUsuario } from '../../interfaces/usuario.interface';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';


@Component({
  selector: 'app-tabla-usuario',
  standalone: true,
  imports: [TableModule,
    CommonModule],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.scss'
})
export class TablaUsuariosComponent implements OnInit{

  titulo: string = 'Usuarios'
  listaUsuarios: IUsuario[] = [];
  UsuarioSeleccionado: IUsuario | undefined;  
  
  private _servicioUsuario = inject(UsuariosService);
  private _route = inject(Router);

  constructor(){}

  ngOnInit(): void {

    this._servicioUsuario.getUsuarios().subscribe({
      next: (data: IUsuario[]) => {
        this.listaUsuarios = data;
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  eliminar(id: number): void{
    alert(id);
  }

  editar(id: number): void{
    this._route.navigate(['/usuarios', id]);
  }

  informacion(item: IUsuario): void {
    this.UsuarioSeleccionado = item;
  }
}
