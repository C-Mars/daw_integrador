import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActividadDto } from '../dtos/actividad.dto';
//import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {
  private apiUrl = 'http://localhost:3000/api/actividades';

  constructor(private http: HttpClient) { }

  getActividades(): Observable<ActividadDto[]> {
    return this.http.get<ActividadDto[]>(this.apiUrl);
  }

  getActividadById(id: number): Observable<ActividadDto> {
    return this.http.get<ActividadDto>(`${this.apiUrl}/${id}`);
  }

  crearActividad(actividad: ActividadDto): Observable<ActividadDto> {
    return this.http.post<ActividadDto>(this.apiUrl, actividad);
  }

  editarActividad(actividad: ActividadDto): Observable<ActividadDto> {
    return this.http.put<ActividadDto>(`${this.apiUrl}/${actividad.id}`, actividad);
  }

  eliminarActividad(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
