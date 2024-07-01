import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable, map } from 'rxjs';
import { ActividadDto } from '../dtos/Actividad.dto';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
import { RolesEnum } from '../enums/roles.enum';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { EditarActividadDto } from '../dtos/editar-actividad.dto';
import { CrearActividadDto } from '../dtos/crear-actividad.dto';


@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private readonly platformId = inject(PLATFORM_ID);
  constructor(
    private _client: HttpClient,
    private _authService: AuthService,
    private _router: Router
  ) { }

  getActividades(): Observable<ActividadDto[]> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
    }
    return this._client.get<ActividadDto[]>(`${environment?.apiUrl}/actividades`);;
  }

  // Obtener Actividades por usuario
  getActividadPorUsuario(Id: number): Observable<ActividadDto[]> {
    return this._client.get<ActividadDto[]>(`${environment.apiUrl}/actividades/usuario/${Id}`).pipe(
      map(actividades => actividades.filter(actividad => actividad.estado === 'pendiente'))
    );
  }
  getActividad(id: number): Observable<ActividadDto> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
    }
    return this._client.get<ActividadDto>(`${environment?.apiUrl}/actividades/${id}`);
  }

  crearActividad(actividad: CrearActividadDto): Observable<CrearActividadDto> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
    }
    return this._client.post<CrearActividadDto>(`${environment?.apiUrl}/actividades`, actividad);
  }

  editarActividad(actividad: EditarActividadDto): Observable<EditarActividadDto> {
    if (isPlatformBrowser(this.platformId)) {
      // Verificar si el usuario tiene el rol de ADMINISTRADOR o EJECUTOR
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR) && !this._authService.hasRole(RolesEnum.EJECUTOR)) {
        throw new Error('El usuario no está autorizado para realizar esta acción.');
      }
    }

    return this._client.patch<EditarActividadDto>(`${environment.apiUrl}/actividades/${actividad.id}`, actividad);
  }


  eliminarActividad(id: number): Observable<void> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
    }
     return this._client.delete<void>(`${environment?.apiUrl}/actividades/${id}`);
  }

  private verificarAutorizacion(): void {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no está autorizado para ver esta sección');
      }
    }
  }
}
