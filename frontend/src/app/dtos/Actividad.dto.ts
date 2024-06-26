import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";
import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { UsuarioDto } from "./usuario.dto";
import { ClienteDto } from "./cliente.dto";

export interface ActividadDto {
  usuario: any;
  id: number;
  idCliente: number|null;
  descripcion: string|null;
  fechaInicio: Date;
  fechaModificacion: Date;
  prioridad: PrioridadActividadEnum|null;
  estado: EstadoActividadEnum|null;
  idUsuarioActual: number|null;
  idUsuarioModificacion: number|null;
}
