import { HttpClient, withFetch } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { UsuarioDto } from '../dtos/usuario.dto';
import { environment } from '../environments/environment';
import { EditarUsuarioDto } from '../dtos/editar-usuario.dto';


@Injectable({
  providedIn: 'root',
})
export class AuthService {


  constructor(
    private _client: HttpClient,
    private _router: Router) {

  }

  login(nombreUsuario: string, clave: string): Observable<{ token: string }> {
    return this._client.post<{ token: string }>(environment.apiUrl +'/auth/login', {
      nombreUsuario,
      clave,
    });
  }

  //  registroUsuario(detalleUsuario: UsuarioDto) {
  //     return this._client.post(environment.apiUrl +'/auth/registro', detalleUsuario);
  //   }
  setSession(token: string) {
    sessionStorage.setItem('token', token);
  }

  logout() {
    sessionStorage.removeItem('token');
    this._router.navigateByUrl('inicio');
  }

  isLoggedIn(): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !new JwtHelperService().isTokenExpired(token);
  }

  hasRole(rol: RolesEnum): boolean {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    const userRole = new JwtHelperService().decodeToken(token).rol;

    return userRole === rol;
  }


  isLogged(): boolean {
    return sessionStorage.getItem('token') ? true : false;
  }
}
