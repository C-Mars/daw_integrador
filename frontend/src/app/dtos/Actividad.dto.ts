import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";
import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { UsuarioDto } from "./usuario.dto";
import { ClienteDto } from "./cliente.dto";

export interface ActividadDto {
  id: number;
  idCliente: ClienteDto;
  descripcion: string | null;
  prioridad: PrioridadActividadEnum | null;
  estado: EstadoActividadEnum | null;
  idUsuarioActual: UsuarioDto | null;
  idUsuarioModificacion: UsuarioDto | null;
  fechaModificacion: Date | null;
  fechaInicio: Date | null;
  resuelta: boolean;
  nombre: string;
  clienteEmail: string;
}
