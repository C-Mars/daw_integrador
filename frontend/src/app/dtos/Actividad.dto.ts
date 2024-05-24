import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";
import { UsuarioDto } from "./usuario.dto";


export interface ActividadDto{
    id: number;
    idCliente: number;
    descripcion: string|null;
    idUsuarioActual: UsuarioDto|null;
    prioridad: PrioridadActividadEnum|null;
    idUsuarioModificacion: UsuarioDto|null;
    fechaModificacion: Date|null; 
    fechaInicio: Date|null;
    estado: EstadoActividadEnum|null;
}