import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";
import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { UsuarioDto } from "./usuario.dto";
import { ClienteDto } from "./cliente.dto";

export interface ActividadDto {
  id: number;
  idCliente: number;
  descripcion: string;
  fechaInicio: Date;
  fechaModificacion: Date;
  prioridad: PrioridadActividadEnum;
  estado: EstadoActividadEnum;
  idUsuarioActual: number;
  idUsuarioModificacion: number;
}
