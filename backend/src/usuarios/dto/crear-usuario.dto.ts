import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { RolesEnum } from "../../auth/enums/roles.enum"
import { EstadosUsuarioEnum } from "../../auth/enums/estado-usuario.enum"
import { Transform } from "class-transformer"

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
    foto: string
    
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

    @IsString()
    @IsNotEmpty()
    estado:EstadosUsuarioEnum.ACTIVO
}