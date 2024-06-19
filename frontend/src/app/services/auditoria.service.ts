import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable, PLATFORM_ID, inject } from "@angular/core";
import { AuditoriaDto } from "../dtos/auditoria.dto";
import { isPlatformBrowser } from "@angular/common";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { environment } from "../environments/environment";
import { RolesEnum } from "../enums/roles.enum";

@Injectable({
    providedIn: 'root'
})
export class AuditoriaService{
    private readonly platformId = inject(PLATFORM_ID);
    constructor(private _client: HttpClient,
        private _authService: AuthService,
        private _router: Router) { }
    
    

        getAuditoriaActividad(id: number): Observable<AuditoriaDto[]> {
            if (isPlatformBrowser(this.platformId)) {
              if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
                throw new Error('El usuario no tiene permisos para ver esta sección');
              }
            }
            return this._client.get<AuditoriaDto[]>(`${environment.apiUrl}/auditoria/${id}`);
          }
        
          getTodasAuditorias(): Observable<AuditoriaDto[]> {
            if (isPlatformBrowser(this.platformId)) {
              if (!this._authService.hasRole(RolesEnum.ADMINISTRADOR)) {
                throw new Error('El usuario no tiene permisos para ver esta sección');
              }
            }
            return this._client.get<AuditoriaDto[]>(`${environment.apiUrl}/auditoria/todo`);
          }
}
    
    

