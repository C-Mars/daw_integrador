import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { EstadosUsuarioEnum } from "src/auth/enums/estado-usuario.enum"
import { RolesEnum } from "src/auth/enums/roles.enum"

export class EditarUsuario{   
   
  
    @IsOptional()
    
    id?:number
 

    @IsOptional()
    @IsString()
    nombres?: string
    
    @IsOptional()
    @IsString()
    apellidos?:string
    
    @IsOptional()
    @IsEmail()
    email?:string
    
    @IsOptional()
    foto?:string
    
    @IsOptional()
    @IsString()
    rol?: RolesEnum
   
    @IsOptional()
    @IsString()
    nombreUsuario?: string

    // @Transform(({value})=> value.thim())
    @IsOptional()
    @MinLength(6)
    clave?:string

    @IsOptional()
    @IsString()
    estado?: EstadosUsuarioEnum
}