import { IsNotEmpty, IsString } from "class-validator"



export class loginDto{
    
    @IsString()
    @IsNotEmpty()
    nombreUsuario: string

    @IsNotEmpty()
    clave:string
} 