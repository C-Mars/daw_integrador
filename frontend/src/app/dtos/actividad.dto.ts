import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";
import { UsuarioDto } from "./usuario.dto";

export class ActividadDto {
    id: number;
    idCliente: number;
    descripcion: string | null;
    idUsuarioActual: UsuarioDto | null;
    prioridad: PrioridadActividadEnum | null;
    idUsuarioModificacion: UsuarioDto | null;
    fechaModificacion: Date | null;
    fechaInicio: Date | null;
    estado: EstadoActividadEnum | null;

    constructor() {
        this.id = 0;
        this.idCliente = 0;
        this.descripcion = null;
        this.idUsuarioActual = null;
        this.prioridad = null;
        this.idUsuarioModificacion = null;
        this.fechaModificacion = null;
        this.fechaInicio = null;
        this.estado = null;
    }
}
