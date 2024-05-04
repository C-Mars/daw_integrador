import { IsDate, IsNotEmpty, IsString, isDate } from "class-validator";
import { EstadoActividad } from "src/actividades/enums/estado-actividad.enum";
import { PrioridadActividad } from "src/actividades/enums/prioridad-actividad.enum";
import { OperacionAuditoria } from "../enums/auditoriaEnum.enum";

//Fijarse si esto está bien hecho, el estado no sé si puede ser un enum o simplemente debe ser algo automático @Mario

export class auditoriaDto{

    @IsString()
    @IsNotEmpty()
    descripcion:string;

    @IsNotEmpty()
    cliente: number;

    @IsNotEmpty()
    usuarioActual:number;

    @IsString()
    @IsNotEmpty()
    prioridad:PrioridadActividad;

    @IsNotEmpty()
    usuarioModificacion:number;

    @IsDate()
    fechaModificacion:Date;

    @IsDate()
    fechaInicio:Date;

    @IsString()
    @IsNotEmpty()
    estado: EstadoActividad;

    @IsString()
    @IsNotEmpty()
    operacion: OperacionAuditoria;

}


