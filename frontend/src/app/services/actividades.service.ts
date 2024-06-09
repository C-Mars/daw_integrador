import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActividadDto } from '../dtos/actividad.dto';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private apiUrl = 'http://localhost:3000/api/actividades';

  constructor(private http: HttpClient) { }

  getActividades(): Observable<ActividadDto[]> {
    return this.http.get<ActividadDto[]>(this.apiUrl);
  }

  getActividad(id: number): Observable<ActividadDto> {
    return this.http.get<ActividadDto>(`${this.apiUrl}/${id}`);
  }

  createActividad(actividad: ActividadDto): Observable<ActividadDto> {
    return this.http.post<ActividadDto>(this.apiUrl, actividad);
  }

  updateActividad(actividad: ActividadDto): Observable<ActividadDto> {
    return this.http.patch<ActividadDto>(`${this.apiUrl}/${actividad.id}`, actividad);
  }

  deleteActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
