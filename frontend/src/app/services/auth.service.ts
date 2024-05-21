import { HttpClient, withFetch } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { IUsuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiURL = `http://localhost:3000/api`

  constructor(
    private _client: HttpClient,
    private _router: Router) {

  }

  login(nombreUsuario: string, clave: string): Observable<{ token: string }> {
    return this._client.post<{ token: string }>(`${this.apiURL}/auth/login`, {
      nombreUsuario,
      clave,
    });
  }

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


  getUsuarios(): Observable<IUsuario[]> {
    if (!this.hasRole(RolesEnum.ADMINISTRADOR)){
      throw new Error('El usuario no esta autorizado para ver esta sección')
    }
    return this._client.get<IUsuario[]>(`${this.apiURL}/usuarios`);
  }

  getUsuario(id: number): Observable<IUsuario> {
    
    
    return this._client.get<IUsuario>(`${this.apiURL}/usuarios/${id}`);
  }
  
  isLogged(): boolean {
    
    return  sessionStorage.getItem('token') ? true : false;
  }
}


//nos devuelve el rol que estamos buscando
