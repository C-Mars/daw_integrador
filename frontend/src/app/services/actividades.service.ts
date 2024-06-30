import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, Observable } from 'rxjs';
import { ActividadDto } from '../dtos/Actividad.dto';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
import { RolesEnum } from '../enums/roles.enum';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


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

  getActividad(id: number): Observable<ActividadDto> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
    }
    return this._client.get<ActividadDto>(`${environment?.apiUrl}/actividades/${id}`);
  }

  crearActividad(actividad: ActividadDto): Observable<ActividadDto> {
    if (isPlatformBrowser(this.platformId)) {
      if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
        throw new Error('El usuario no esta autorizado para ver esta sección')
      }
    }
    return this._client.post<ActividadDto>(`${environment?.apiUrl}/actividades`, actividad);
  }


  editarActividad(actividad: ActividadDto): Observable<ActividadDto> {
    if (isPlatformBrowser(this.platformId)) {
       if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
         throw new Error('El usuario no esta autorizado para ver esta sección')
        }
    }
  //return this._client.put<ActividadDto>(`${environment.apiUrl}/actividades/${actividad.id}`, actividad);
  //return this._client.patch<ActividadDto>(`${environment.apiUrl}/actividades/${actividad.id}`, actividad);
  //return this._client.patch<ActividadDto>(environment?.apiUrl + '/actividades/${actividad.id}', actividad)
  //return this._client.patch<ActividadDto>(`${environment.apiUrl}/actividades/${actividad.id}`, actividad);
   return this._client.patch<ActividadDto>(environment?.apiUrl + `/actividades/{actividad.id}`, actividad);
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
