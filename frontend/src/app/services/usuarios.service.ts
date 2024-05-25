import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { UsuarioDto } from '../dtos/usuario.dto';
import { environment } from '../environments/environment';
import { EditarUsuarioDto } from '../dtos/editar-usuario.dto';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( 
    private _client: HttpClient,
    
    private _router: Router) { }
    
    hasRole(rol: RolesEnum): boolean {
      const token = sessionStorage.getItem('token');
      if (!token) {
        return false;
      }
      const userRole = new JwtHelperService().decodeToken(token).rol;
  
      return userRole === rol;
    }
  
    getUsuarios(): Observable<UsuarioDto[]> {
      if (!this.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
      const usuarios = this._client.get<UsuarioDto[]>(environment.apiUrl+'/usuarios');
      return usuarios
    }

    crear(usuarioDto: UsuarioDto): Observable<UsuarioDto> {
      return this._client.post<UsuarioDto>(
        environment?.apiUrl + '/usuarios',
        usuarioDto
      );
    }
    
    editar(usuarioDto: EditarUsuarioDto) {
      return this._client.put(
        environment?.apiUrl + '/usuarios/' +  usuarioDto.id,
        usuarioDto
      );
    }

    // eliminar(usuarioDto: EditarUsuarioDto) {
    //   return this._client.put(
    //     environment?.apiUrl + '/usuarios/' +  usuarioDto.id,
    //     usuarioDto
    //   );
    // }
    uploadFile(file: File) {
      const formData = new FormData();
      formData.append('file', file);
  
      return this._client.post(environment.apiUrl +'/auth/registro', formData);
    }
   
}
