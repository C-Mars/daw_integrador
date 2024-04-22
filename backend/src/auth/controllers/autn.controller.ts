import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";
import { RegistroUsuarioDto } from "../dtos/registro.dto";

@Controller('/auth')
export class AuthController{

    constructor(private AuthService :AuthService){
        
    }

    @Post('/registro')
    async registroUsuario(@Body() regisroUsuarioDto:RegistroUsuarioDto){
        return await this.AuthService.registroUsuario(regisroUsuarioDto)
    };

    @Post('/login')
    async login(@Body() loginDto:LoginDto){
        // console.log('auth funciona')
        return await this.AuthService.login(loginDto);
    }
}