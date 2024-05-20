import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/usuario.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  // private apiURL = 'http://localhost:3000/api/';

  constructor(private _http: HttpClient) { }

  getUsuarios(): Observable<IUsuario[]>{
    return this._http.get<IUsuario[]>(`http://localhost:3000/api/usuarios` );
  }

  getUsuario(id: number): Observable<IUsuario>{
    return this._http.get<IUsuario>(`http://localhost:3000/api/usuarios/${id}` );    
  }
}
