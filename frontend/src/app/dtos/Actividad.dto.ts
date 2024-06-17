export interface ActividadDto {
  id: number;
  idCliente: number;
  descripcion: string;
  idUsuarioActual: number;
  prioridad: string;
  idUsuarioModificacion: number;
  fechaModificacion: Date;
  fechaInicio: Date;
}
