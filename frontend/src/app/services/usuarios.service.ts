import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { UsuarioDto } from '../dtos/usuario.dto';
import { EditarUsuarioDto } from '../dtos/editar-usuario.dto';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { CrearUsuarioDto } from '../dtos/crear-usuario.dto';
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
    private _router: Router) { }


  getUsuarios(): Observable<UsuarioDto[]> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
    }
    const usuarios = this._client.get<UsuarioDto[]>(`${environment?.apiUrl}/usuarios/todos`);
    return usuarios
  }



  getFotoUsuario(usuarioDto: UsuarioDto): Observable<Blob> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no está autorizado para ver esta sección');
      }
    }
    return this._client.get(`${environment.apiUrl}/usuarios/foto/${usuarioDto.foto}`,{ responseType: 'blob' })
 
  }


  // crearv(usuarioDto: CrearUsuarioDto): Observable<UsuarioDto> {
  //   if (isPlatformBrowser(this.platformId)) {
  //     if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
  //       throw new Error('El usuario no esta autorizado para ver esta sección')
  //     }
  //   }
  //   return this._client.post<UsuarioDto>(
  //     `${environment?.apiUrl}/usuarios`,
  //     usuarioDto
  //   );
  // }
  crear(formData: FormData): Observable<UsuarioDto> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
    }
    return this._client.post<UsuarioDto>(
        `${environment.apiUrl}/usuarios`,
        formData
    );
}

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

  eliminar(id: number): Observable<void> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no está autorizado para ver esta sección');
      }
    }
  
    return this._client.delete<void>(`${environment.apiUrl}/usuarios/eliminar/${id}`);
  }

  subirFoto(UsuarioDto: UsuarioDto , formData: FormData): Observable<any> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
    }
    //  return this._client.post<any>(environment?.apiUrl + '/static/usuarios', formData);
    return this._client.post<any>(
      `${environment.apiUrl}/usuarios/foto/${UsuarioDto.foto}`, formData, 
    )
  
  }
}