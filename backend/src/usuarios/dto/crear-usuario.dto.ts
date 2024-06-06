import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { RolesEnum } from "../../auth/enums/roles.enum"
import { EstadosUsuarioEnum } from "../../auth/enums/estado-usuario.enum"
import { Transform } from "class-transformer"
import { Usuario } from "../entities/usuario.entity"

export class CrearUsuarioDto{
    
    @IsString()
    @IsNotEmpty()
    nombres: string
    
    @IsString()
    @IsNotEmpty()
    apellidos:string
   
    @IsEmail()
    email:string
    
    @IsOptional()
    foto?: string
    
    // @IsOptional()
    // fotoUrl?: string
    
    @IsString()
    @IsNotEmpty()
    rol: RolesEnum
   
    
    @IsString()
    @IsNotEmpty()
    nombreUsuario: string

    // @Transform(({value})=> value.thim())
    @IsNotEmpty()
    @MinLength(6)
    clave:string

   
   
}