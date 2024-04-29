import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EstadoActividad } from "../enums/estado-actividad.enum";
import { PrioridadActividad } from "../enums/prioridad-actividad.enum";


export class EditarActividadDto{
    
    
    @IsOptional()
    @IsNotEmpty()
    idCliente?: number;

    @IsOptional()
    @IsString()
    descripcion?:string;

    @IsOptional()
    @IsNotEmpty()
    idUsuarioActual?:number;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    prioridad?: PrioridadActividad;
    
    @IsOptional()
    @IsNotEmpty()
    idUsuarioModificacion?:number;

    @IsOptional()
    @IsNotEmpty()
    @IsDate()
    fechaModificacion?: Date;
   
    @IsOptional()
    @IsNotEmpty()
    @IsDate()
    fechaInicio?: Date;
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    estado?: EstadoActividad;

}