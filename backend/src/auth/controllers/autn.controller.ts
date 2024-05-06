import {  Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";
import { ApiTags } from "@nestjs/swagger";
<<<<<<< Updated upstream
import { CrearUsuarioDto } from "src/usuarios/dto/crear-usuario.dto";
=======
//import { FileInterceptor } from "@nestjs/platform-express";
//import { ArchivoUsuarioDto } from "../dtos/archivo-usuario.dto";
//import { fileFilter } from "src/files/helpers/archivosfiltro.helper";
//import { diskStorage } from "multer";
import { extname } from "path";
>>>>>>> Stashed changes

@ApiTags('auth')
@Controller('/auth')
export class AuthController{

    constructor(private AuthService :AuthService){
        
    }

    @Post('/registro')
    async registroUsuario(
<<<<<<< Updated upstream
        @Body() crearUsuarioDto:CrearUsuarioDto){
        return await this.AuthService.registroUsuario(crearUsuarioDto)
=======
        @Body() regisroUsuarioDto:RegistroUsuarioDto){
        return await this.AuthService.crearUsuario(regisroUsuarioDto)
>>>>>>> Stashed changes
    };
    
    

    @Post('/login')
    async login(@Body() loginDto:LoginDto){
        return await this.AuthService.login(loginDto);
    }

}