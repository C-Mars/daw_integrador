import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { TableModule } from 'primeng/table';
import { IUsuario } from '../../interfaces/usuario.interface';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-tabla-usuario',
  standalone: true,
  imports: [TableModule,CardModule,
    CommonModule,ButtonModule],
  templateUrl: './tabla-usuarios.component.html',
  styleUrl: './tabla-usuarios.component.scss'
})
export class TablaUsuariosComponent implements OnInit {

  titulo: string = 'Usuarios'
  listaUsuarios: IUsuario[] = [];
  usuarioSeleccionado: IUsuario | undefined;

  // private _servicioUsuario = inject(AuthService);
  // private _route = inject(Router);

  constructor(private _servicioUsuario: AuthService,
    private _route: Router) { }

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

  eliminar(id: number): void {
    alert(id);
  }

  editar(id: number): void {
    this._route.navigate(['/usuarios', id]);
  }

  informacion(item: IUsuario): void {
    this.usuarioSeleccionado = item;
  }
  // getSeverity(status: string) {
  //   switch (status) {
  //       case 'EJECUTOR':
  //           return 'success';
  //       case 'ADMINISTRADOR':
  //           return 'warning';
  //   }
}
