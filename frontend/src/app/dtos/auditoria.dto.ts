import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { OperacioAuditoriaEnum } from "../enums/operacion-auditoria.enum";
import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";
import { ActividadDto } from "./Actividad.dto";
import { ClienteDto } from "./cliente.dto";

import { UsuarioDto } from "./usuario.dto";


export interface AuditoriaDto{
    id: number;
    idActividad: ActividadDto|null;
    idCliente: ClienteDto|null;
    descripcion: string|null;
    idUsuarioActual: UsuarioDto|null;
    prioridad: PrioridadActividadEnum|null;
    idUsuarioModificacion: UsuarioDto|null;
    fechaModificacion: Date;
    fechaInicio: Date;
    estado: EstadoActividadEnum|null;
    operacion: OperacioAuditoriaEnum|null;
}