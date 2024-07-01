import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { UsuarioDto } from '../dtos/usuario.dto';
import { EditarUsuarioDto } from '../dtos/editar-usuario.dto';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
 
  private readonly platformId = inject(PLATFORM_ID);
 
  constructor(
    private _client: HttpClient,
    private _authService: AuthService,
  ) { }

//Trae todos los usuarios activos y baja
  getUsuarios(): Observable<UsuarioDto[]> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
    }
    const usuarios = this._client.get<UsuarioDto[]>(`${environment?.apiUrl}/usuarios/todos`);
    return usuarios
  }


//Trae las fotos de cada usuario 
  getFotoUsuario(usuarioDto: UsuarioDto): Observable<Blob> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no está autorizado para ver esta sección');
      }
    }
    return this._client.get(`${environment.apiUrl}/usuarios/foto/${usuarioDto.foto}`, { responseType: 'blob' })

  }

// Registra un nuevo usuario
  crear(formData: FormData): Observable<UsuarioDto> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
    }
    return this._client.post<UsuarioDto>(
      `${environment.apiUrl}/usuarios`, formData
    );
  }

  // Edita un usuario seleccionado
  editar(UsuarioDto: EditarUsuarioDto) {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no está autorizado para ver esta sección');
      }
    }
    return this._client.patch(
      `${environment?.apiUrl}/usuarios/editar/${UsuarioDto.id}`, UsuarioDto
    );

  }

  //Además de editar un usuario seleccionado  me permite canbiar la foto  
  editarConFoto(formData: FormData, id: number) {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no está autorizado para ver esta sección');
      }
    }

    return this._client.patch(
      `${environment?.apiUrl}/usuarios/editar/${id}`, formData
    );
  }

  //Eliminar usuario
  eliminar(id: number): Observable<void> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no está autorizado para ver esta sección');
      }
    }

    return this._client.delete<void>(`${environment.apiUrl}/usuarios/eliminar/${id}`);
  }
}