<<<<<<< HEAD
import { HttpClient, withFetch } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private client: HttpClient, private router: Router) {}

  login(nombreUsuario: string, clave: string): Observable<{ token: string }> {
    return this.client.post<{ token: string }>('http://localhost:3000/api/auth/login', {
      nombreUsuario,
      clave,
    });
  }

  setSession(token: string) {
    sessionStorage.setItem('token', token);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('login');
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

    return new JwtHelperService().decodeToken(token).rol === rol;
  }
}
//nos devuelve el rol que estamos buscando
=======
import { HttpClient, withFetch } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private client: HttpClient, 
    private router: Router) {}

  login(nombreUsuario: string, clave: string): Observable<{ token: string }> {
    return this.client.post<{ token: string }>('http://localhost:3000/api/auth/login', {
      nombreUsuario,
      clave,
    });
  }

  setSession(token: string) {
    sessionStorage.setItem('token', token);
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigateByUrl('login');
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

    return new JwtHelperService().decodeToken(token).rol === rol;
  }
}
//nos devuelve el rol que estamos buscando
>>>>>>> 6ba74a53bc3e5ebabb31b05d72a5e4e6349894be
