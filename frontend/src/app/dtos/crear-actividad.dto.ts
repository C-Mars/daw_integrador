import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";
import { ClienteDto } from "./cliente.dto";
import { UsuarioDto } from "./usuario.dto";

export interface CrearActividadDto {
  idCliente: ClienteDto;
  descripcion: string|null;
  prioridad: PrioridadActividadEnum|null;
  estado: EstadoActividadEnum|null;
  idUsuarioActual: UsuarioDto |null;
  idUsuarioModificacion:UsuarioDto|null;
}
