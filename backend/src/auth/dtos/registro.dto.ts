import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator"
import { RolesEnum } from "../enums/roles.enum"
import { EstadosUsuarioEnum } from "../enums/estado-usuario.enum"
import { Transform } from "class-transformer"

export class RegistroUsuarioDto{
    
    @IsString()
    @IsNotEmpty()
    nombres: string
    
    @IsString()
    @IsNotEmpty()
    apellidos:string
   
    @IsEmail()
    email:string
    
    @IsString()
    @IsNotEmpty()
    rol: RolesEnum
   
    
    @IsString()
    @IsNotEmpty()
    nombreUsuario: string

    @Transform(({value})=> value.thim())
    @IsNotEmpty()
    @MinLength(8)
    clave:string

    @IsString()
    @IsNotEmpty()
    estado:EstadosUsuarioEnum
}