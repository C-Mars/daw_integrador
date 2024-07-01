import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";
import { ClienteDto } from "./cliente.dto";
import { UsuarioDto } from "./usuario.dto";

export interface EditarActividadDto {
  id: number,
  idCliente: ClienteDto | null,
  descripcion: string,
  prioridad: PrioridadActividadEnum,
  estado: EstadoActividadEnum,
  idUsuarioActual: UsuarioDto|null,
  idUsuarioModificacion:UsuarioDto|null,
}
