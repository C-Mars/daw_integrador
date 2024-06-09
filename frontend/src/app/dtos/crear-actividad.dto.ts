import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";

export interface CrearActividadDto {
  idCliente: number;
  descripcion: string;
  fechaInicio: Date;
  prioridad: PrioridadActividadEnum;
  estado: EstadoActividadEnum;
}
