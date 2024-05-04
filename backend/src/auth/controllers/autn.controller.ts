import {  Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";
import { ApiTags } from "@nestjs/swagger";
import { CrearUsuarioDto } from "src/usuarios/dto/crear-usuario.dto";

@ApiTags('auth')
@Controller('/auth')
export class AuthController{

    constructor(private AuthService :AuthService){
        
    }

    @Post('/registro')
    async registroUsuario(
        @Body() crearUsuarioDto:CrearUsuarioDto){
        return await this.AuthService.registroUsuario(crearUsuarioDto)
    };
    
    

    @Post('/login')
    async login(@Body() loginDto:LoginDto){
        // console.log('auth funciona')
        return await this.AuthService.login(loginDto);
    }

}