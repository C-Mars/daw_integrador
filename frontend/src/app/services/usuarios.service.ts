import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { UsuarioDto } from '../dtos/usuario.dto';
import { environment } from '../environments/environment';
import { EditarUsuarioDto } from '../dtos/editar-usuario.dto';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { isPlatformBrowser } from '@angular/common';
import { CrearUsuarioDto } from '../dtos/crear-usuario.dto';


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private readonly platformId = inject(PLATFORM_ID);
  constructor( 
    private _client: HttpClient,
    
    private _router: Router) { }
    
    hasRole(rol: RolesEnum): boolean {
        if (isPlatformBrowser(this.platformId)){
          const token = sessionStorage.getItem('token');
      
          if (!token) {
            return false;
          };
      
          const userRole = new JwtHelperService().decodeToken(token).rol;
          return userRole === rol;
        }
        
        return false;
      }
  
    getUsuarios(): Observable<UsuarioDto[]> {
      if (isPlatformBrowser(this.platformId)){
        if (!this.hasRole(RolesEnum.ADMINISTRADOR)) {
          throw new Error('El usuario no esta autorizado para ver esta sección')
        }
      }
      
      const usuarios = this._client.get<UsuarioDto[]>(environment.apiUrl + '/usuarios');
      return usuarios
    }

  

    getFotoUsuario(id: string): Observable<Blob> {
      if (isPlatformBrowser(this.platformId)){
        if (!this.hasRole(RolesEnum.ADMINISTRADOR)) {
          throw new Error('El usuario no esta autorizado para ver esta sección')
        }
      }
      return this._client.get(`${environment.apiUrl}/usuarios/${id}`, { responseType: 'blob' });
    }
    
    crear(usuarioDto: CrearUsuarioDto): Observable<UsuarioDto> {
      if (isPlatformBrowser(this.platformId)){
        if (!this.hasRole(RolesEnum.ADMINISTRADOR)) {
          throw new Error('El usuario no esta autorizado para ver esta sección')
        }
      }
      return this._client.post<UsuarioDto>(
        environment.apiUrl + '/usuarios',
        usuarioDto
      );
    }
    
    editar(usuarioDto: EditarUsuarioDto) {
      if (isPlatformBrowser(this.platformId)){
        if (!this.hasRole(RolesEnum.ADMINISTRADOR)) {
          throw new Error('El usuario no esta autorizado para ver esta sección')
        }
      }
      const usuario =this._client.put(environment?.apiUrl + '/usuarios/' +  usuarioDto.id,
        usuarioDto);
      return  usuario
    
    }

    eliminar(usuarioDto: UsuarioDto) {
      if (isPlatformBrowser(this.platformId)){
        if (!this.hasRole(RolesEnum.ADMINISTRADOR)) {
          throw new Error('El usuario no esta autorizado para ver esta sección')
        }
      }
      const usuariodelete =this._client.delete(
        environment?.apiUrl + '/usuarios/' +  usuarioDto.id);
      return  usuariodelete
      
    }

    subirFoto(formData: FormData): Observable<any> {
      if (isPlatformBrowser(this.platformId)){
        if (!this.hasRole(RolesEnum.ADMINISTRADOR)) {
          throw new Error('El usuario no esta autorizado para ver esta sección')
        }
      }
      return this._client.post<any>(environment.apiUrl + '/usuarios', formData);
    }
  }
//