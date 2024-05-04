import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { EstadoActividad } from "../enums/estado-actividad.enum";
import { PrioridadActividad } from "../enums/prioridad-actividad.enum";


export class CrearActividadDto{
    
    // @IsNotEmpty()
    @IsOptional()
    idCliente: number;
    
    @IsString()
    descripcion:string;

    @IsNotEmpty()
    idUsuarioActual:number;

    @IsString()
    @IsNotEmpty()
    prioridad: PrioridadActividad;
    
    @IsNotEmpty()
    idUsuarioModificacion:number;
    
    // @IsNotEmpty()
    // @IsDate()
    // fechaModificacion: Date;
   
    
    // @IsNotEmpty()
    // @IsDate()
    // fechaInicio: Date;
    
    @IsString()
    @IsNotEmpty()
    estado: EstadoActividad;

}