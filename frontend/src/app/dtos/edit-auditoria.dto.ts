import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { OperacioAuditoriaEnum } from "../enums/operacion-auditoria.enum";
import { UsuarioDto } from "./usuario.dto"


export interface ModificacionAuditoria{
    id: number
    idUsuarioActual: UsuarioDto;
    idUsuarioModificacion: UsuarioDto;
    estado: EstadoActividadEnum;
    operacion: OperacioAuditoriaEnum;
}