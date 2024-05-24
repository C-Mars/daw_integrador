import { UsuarioDto } from "./usuario.dto";
import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { OperacioAuditoriaEnum } from "../enums/operacion-auditoria.enum";
import { PrioridadActividad } from "../enums/prioridad-actividad.enum";


export interface AuditoriaDto{
    id: number;
    idActividad: number;
    idCliente: number;
    descripcion: string;
    idUsuarioActual: UsuarioDto;
    prioridad: PrioridadActividad;
    idUsuarioModificacion: UsuarioDto;
    fechaModificacion: Date;
    fechaInicio: Date;
    estado: EstadoActividadEnum;
    operacion: OperacioAuditoriaEnum;
}