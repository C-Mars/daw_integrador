import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, catchError, of, throwError } from 'rxjs';
import { RolesEnum } from '../enums/roles.enum';
import { ClienteDto } from '../dtos/cliente.dto';
import { environment } from '../environments/environment';
import { EditarClienteDto } from '../dtos/editar-cliente.dto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { AuthService } from './auth.service';

import { CrearClienteDto } from '../dtos/crear-cliente.dto';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {
  private readonly platformId = inject(PLATFORM_ID);
  constructor(
    private _client: HttpClient,
    private _authService: AuthService,
    private _router: Router) { }


  getClientes(): Observable<ClienteDto[]> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
    }
    const clientes = this._client.get<ClienteDto[]>(`${environment?.apiUrl}/clientes`);
    return clientes
  }


 
  crear(clienteDto: CrearClienteDto): Observable<ClienteDto> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no está autorizado para ver esta sección');
      }
    }
    const headers = new HttpHeaders({'Content-Type': 'application/json'}); // Cabecera para enviar formato JSON

    return this._client.post<ClienteDto>(
      `${environment.apiUrl}/clientes`,
      clienteDto,
      { headers } // Pasar las cabeceras en la solicitud
    ).pipe(
      catchError(error => {
        // Manejar el error aquí si es necesario
        return throwError(error);
      })
    );
}
  editar(ClienteDto: EditarClienteDto) {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no está autorizado para ver esta sección');
      }
    }
      return this._client.patch(
        `${environment?.apiUrl}/clientes/editar/${ClienteDto.id}`, ClienteDto
      );
    
  }

  eliminar(id: number): Observable<void> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no está autorizado para ver esta sección');
      }
    }
  
    return this._client.delete<void>(`${environment.apiUrl}/clientes/eliminar/${id}`);
  }
}
