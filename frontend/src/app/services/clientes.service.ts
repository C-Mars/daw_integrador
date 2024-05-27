import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { ClienteDto } from '../dtos/cliente.dto';
import { environment } from '../environments/environment';
import { EditarClienteDto } from '../dtos/editar-cliente.dto';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private jwtHelper = new JwtHelperService();

  constructor(
    private _client: HttpClient,
    private _router: Router
  ) { }

  private getToken(): string | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem('token');
    }
    console.error('sessionStorage is not available');
    return null;
  }

  hasRole(rol: RolesEnum): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    try {
      const userRole = this.jwtHelper.decodeToken(token).rol;
      console.log('Rol del usuario:', userRole);

      if (userRole !== rol) {
        console.error('El usuario no tiene el rol necesario:', rol);
        return false;
      }

      return true;
    } catch (e) {
      console.error('Error decodificando el token', e);
      return false;
    }
  }

  getClientes(): Observable<ClienteDto[]> {
    if (!this.hasRole(RolesEnum.ADMINISTRADOR)) {
      console.error('El usuario no está autorizado para ver esta sección');
      return of([]);  // Devuelve un observable vacío para evitar errores adicionales
    }
    return this._client.get<ClienteDto[]>(environment.apiUrl + '/clientes');
  }

  crear(clienteDto: ClienteDto): Observable<ClienteDto> {
    return this._client.post<ClienteDto>(
      environment.apiUrl + '/clientes',
      clienteDto
    );
  }

  editar(clienteDto: EditarClienteDto): Observable<ClienteDto> {
    if (!this.hasRole(RolesEnum.ADMINISTRADOR)) {
      throw new Error('El usuario no está autorizado para ver esta sección');
    }
    return this._client.put<ClienteDto>(
      environment.apiUrl + '/clientes/' + clienteDto.id,
      clienteDto
    );
  }

  eliminar(clienteDto: ClienteDto): Observable<void> {
    if (!this.hasRole(RolesEnum.ADMINISTRADOR)) {
      throw new Error('El usuario no está autorizado para ver esta sección');
    }
    return this._client.delete<void>(
      environment.apiUrl + '/clientes/' + clienteDto.id
    );
  }
}
