import { EstadoActividad } from "src/actividades/enums/estado-actividad.enum";
import { PrioridadActividad } from "src/actividades/enums/prioridad-actividad.enum";
import { OperacionAuditoria } from "../enums/auditoriaEnum.enum";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AuditoriaActividadDto{

    @IsNotEmpty()
    idActividad: number;

    @IsOptional()
    idCliente: number;

    @IsString()
    @IsNotEmpty()
    descripcion: string;

    @IsNotEmpty()
    idUsuarioActual: number

    @IsOptional()
    prioridad: PrioridadActividad;
    
    @IsNotEmpty()
    idUsuarioModificacion: number;
    
    //@IsDate()
    //@IsNotEmpty()
    //fechaModificacion: Date;

    //@IsDate()
    //@IsNotEmpty()
    //fechaInicio: Date;

    @IsNotEmpty()
    estado: EstadoActividad;

    @IsNotEmpty()
    operacion: OperacionAuditoria;

}


