import { HttpClient } from "@angular/common/http";
<<<<<<< HEAD
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Injectable } from "@angular/core";
import { CreateAuditoria } from "../dtos/dtos-auditoria/create-auditoria.dto";
import { ModificacionAuditoria } from "../dtos/dtos-auditoria/edit-auditoria.dto";
import { AuditoriaDto } from "../dtos/dtos-auditoria/auditoria.dto";
=======
import { AuditoriaDto } from "../dtos/auditoria.dto";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";
import { Injectable } from "@angular/core";
import { CreateAuditoria } from "../dtos/create-auditoria.dto";
import { ModificacionAuditoria } from "../dtos/edit-auditoria.dto";
>>>>>>> 895bb6df6dd59710c083516fe048c46bef71c6d3

@Injectable({
    providedIn: 'root'
})
export class AuditoriaService{

    constructor(private client: HttpClient){}

    getAuditoria(): Observable<AuditoriaDto[]>{
        return this.client.get<AuditoriaDto[]>(
            environment?.apiUrl + '/auditoria',
        );
    }

    createAuditoria(auditoriaDto: CreateAuditoria): Observable<AuditoriaDto>{
        return this.client.post<AuditoriaDto>(
            environment?.apiUrl + '/auditoria',
            auditoriaDto
        );
    }

    editAuditoria(auditoriaDto: ModificacionAuditoria){
        return this.client.put(
            environment?.apiUrl + '/auditoria' + auditoriaDto.id,
            auditoriaDto
        )
    }

    auditoriaByDate(auditoriaDto: AuditoriaDto): Observable<AuditoriaDto[]>{
        return this.client.get<AuditoriaDto[]>(
            environment?.apiUrl + '/auditoria' + auditoriaDto.fechaModificacion
        );
    }

    auditoriaByUser(auditoriaDto: AuditoriaDto): Observable<AuditoriaDto[]>{
        return this.client.get<AuditoriaDto[]>(
            environment?.apiUrl + '/auditoria' + auditoriaDto.idUsuarioActual
        )
    }

    auditoriaByMod(auditoriaDto: AuditoriaDto): Observable<AuditoriaDto[]>{
        return this.client.get<AuditoriaDto[]>(
            environment?.apiUrl + '/auditoria' + auditoriaDto.idUsuarioModificacion
        )
    }
}
