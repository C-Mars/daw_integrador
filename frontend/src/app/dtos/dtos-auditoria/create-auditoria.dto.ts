<<<<<<< HEAD:frontend/src/app/dtos/dtos-auditoria/create-auditoria.dto.ts
import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { OperacioAuditoriaEnum } from "../enums/operacion-auditoria.enum";
import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";
import { ActividadDto } from "./Actividad.dto";
import { UsuarioDto } from "./usuario.dto";


export interface CreateAuditoria{
    id: number
    idCliente: number;
    idActividad: ActividadDto;
    idUsuarioActual: UsuarioDto;
    prioridad: PrioridadActividadEnum;
    idUsuarioModificacion: UsuarioDto;
=======
import { UsuarioDto } from "./usuario.dto";
import { OperacioAuditoriaEnum } from "../enums/operacion-auditoria.enum";
import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";
import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { ActividadDto } from "./actividad.dto";

export interface AuditoriaDto{
    id: number;
    idActividad: ActividadDto|null;
    idCliente: number;
    descripcion: string|null;
    idUsuarioActual: UsuarioDto|null;
    prioridad: PrioridadActividadEnum|null;
    idUsuarioModificacion: UsuarioDto|null;
>>>>>>> 895bb6df6dd59710c083516fe048c46bef71c6d3:frontend/src/app/dtos/auditoria.dto.ts
    fechaModificacion: Date;
    fechaInicio: Date;
    estado: EstadoActividadEnum|null;
    operacion: OperacioAuditoriaEnum|null;
}