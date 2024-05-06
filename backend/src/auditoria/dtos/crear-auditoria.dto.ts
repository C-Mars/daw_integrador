import { EstadoActividad } from "src/actividades/enums/estado-actividad.enum";
import { PrioridadActividad } from "src/actividades/enums/prioridad-actividad.enum";
import { OperacionAuditoria } from "../enums/auditoriaEnum.enum";
import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class CrearAuditoriaDto{

    @IsNotEmpty()
    idActividad: number;

    @IsNotEmpty()
    idCliente: number;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsNotEmpty()
    idUsuarioActual: number

    @IsNotEmpty()
    prioridad: PrioridadActividad;
    
    @IsNotEmpty()
    idUsuarioModificion: number;
    
    @IsDate()
    @IsNotEmpty()
    fechaModificacion: Date;

    @IsDate()
    @IsNotEmpty()
    fechaInicio: Date;

    @IsNotEmpty()
    estado: EstadoActividad;

    @IsNotEmpty()
    operacion: OperacionAuditoria;

}


