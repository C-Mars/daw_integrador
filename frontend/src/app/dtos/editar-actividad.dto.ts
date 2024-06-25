import { EstadoActividadEnum } from "../enums/estado-actividad.enum";
import { PrioridadActividadEnum } from "../enums/prioridad-actividad.enum";

export interface EditarActividadDto {
  id: number;
  idCliente: number;
  descripcion: string;
  //fechaInicio: Date;
  //fechaModificacion: Date;
  prioridad: PrioridadActividadEnum;
  estado: EstadoActividadEnum;
}
