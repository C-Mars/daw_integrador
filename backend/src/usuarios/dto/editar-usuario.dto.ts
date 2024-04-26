import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { RolesEnum } from "src/auth/enums/roles.enum"

export class EditarUsuario{   
   
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    nombres?: string
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    apellidos?:string
    
    @IsOptional()
    @IsEmail()
    email?:string
    
    @IsOptional()
    foto?:string
    
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    rol?: RolesEnum
   
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    nombreUsuario?: string

    // @Transform(({value})=> value.thim())
    @IsOptional()
    @IsNotEmpty()
    @MinLength(6)
    clave?:string
}