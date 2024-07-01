/*
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);

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


  setSession(token: string) {
    sessionStorage.setItem('token', token);
  }



  logout() {
    if (isPlatformBrowser(this.platformId)) {
    sessionStorage.removeItem('token');
    this._router.navigateByUrl('inicio');
  }
    return false
  }

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }

    return !new JwtHelperService().isTokenExpired(token);

  }

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

  isLogged(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token') ? true : false;
    }
    return false;
  }
}

*/
// incorporacion de los datos del usuario logeado
import { HttpClient } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { environment } from '../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { UsuarioDto } from '../dtos/usuario.dto';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly platformId = inject(PLATFORM_ID);

  constructor(
    private _client: HttpClient,
    private _router: Router) {

  }

  login(nombreUsuario: string, clave: string): Observable<{ token: string }> {
    return this._client.post<{ token: string }>(environment.apiUrl + '/auth/login', {
      nombreUsuario,
      clave,
    });
  }

  setSession(token: string) {
    sessionStorage.setItem('token', token);
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      sessionStorage.removeItem('token');
      this._router.navigateByUrl('inicio');
    }
    return false;
  }

  isLoggedIn(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }
    const token = sessionStorage.getItem('token');
    if (!token) {
      return false;
    }
    return !new JwtHelperService().isTokenExpired(token);
  }

  hasRole(rol: RolesEnum): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('token');

      if (!token) {
        return false;
      }

      const userRole = new JwtHelperService().decodeToken(token).rol;
      return userRole === rol;
    }
    return false;
  }

  isLogged(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return sessionStorage.getItem('token') ? true : false;
    }
    return false;
  }

  getUsuario(): UsuarioDto | null {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('token');
      if (token) {
        const decodedToken = new JwtHelperService().decodeToken(token);
        return {
          id: decodedToken.id,
          nombres: decodedToken.nombres,
          apellidos: decodedToken.apellidos,
          email: decodedToken.email,
          foto: decodedToken.foto,
          fotoUrl: decodedToken.fotoUrl,
          rol: decodedToken.rol,
          nombreUsuario: decodedToken.nombreUsuario,
          clave: null,
          estado: decodedToken.estado,
          //nombreCompleto:decodedToken.nombreCompleto
        };
      }
    }
    return null;
  }
}
