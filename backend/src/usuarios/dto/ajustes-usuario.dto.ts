import { IsOptional, IsString, MinLength } from "class-validator"

export class AjustesUsuario{   
   
    @IsOptional()
    id?:number
   
    @IsOptional()
    @IsString()
    nombreUsuario?: string
    // @Transform(({value})=> value.thim())
    @IsOptional()
    @MinLength(6)
    clave?:string

}