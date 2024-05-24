import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioDto } from '../dtos/usuario.dto';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { RolesEnum } from '../enums/roles.enum';
import { environment } from '../environments/environment';
import { EditarUsuarioDto } from '../dtos/editar-usuario.dto';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor( private _client: HttpClient,
    private _authService: AuthService,
    private _router: Router) { }

  getUsuarios(): Observable<UsuarioDto[]> {
    if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
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

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this._client.post(environment.apiUrl +'/auth/registro', formData);
  }
}
