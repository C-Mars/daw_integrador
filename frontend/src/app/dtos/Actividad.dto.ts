import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";
import { UsuarioDto } from "./usuario.dto";


export interface ActividadDto{
    id: number;
    idCliente: number;
    descripcion: string;
    idUsuarioActual: UsuarioDto;
    prioridad: PrioridadActividadEnum;
    idUsuarioModificacion: UsuarioDto;
    fechaModificacion: Date; 
    fechaInicio: Date;
    estado: EstadoActividadEnum;
}