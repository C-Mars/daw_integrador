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
    fechaModificacion: Date;
    fechaInicio: Date;
    estado: EstadoActividadEnum|null;
    operacion: OperacioAuditoriaEnum|null;
}