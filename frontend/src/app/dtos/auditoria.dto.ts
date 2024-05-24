import { UsuarioDto } from "./usuario.dto";
import { OperacioAuditoriaEnum } from "../enums/operacion-auditoria.enum";
import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";
import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { ActividadDto } from "./Actividad.dto";

export interface AuditoriaDto{
    id: number;
    idActividad: ActividadDto;
    idCliente: number;
    descripcion: string;
    idUsuarioActual: UsuarioDto;
    prioridad: PrioridadActividadEnum;
    idUsuarioModificacion: UsuarioDto;
    fechaModificacion: Date;
    fechaInicio: Date;
    estado: EstadoActividadEnum;
    operacion: OperacioAuditoriaEnum;
}