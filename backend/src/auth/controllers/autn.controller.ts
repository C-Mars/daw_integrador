import { Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";
import { ApiTags } from "@nestjs/swagger";
import { CrearUsuarioDto } from "src/usuarios/dto/crear-usuario.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { fileFilter } from "../../archivos/helpers/archivosfiltro.helper";
import { diskStorage } from "multer";
import { extname } from "path";
import { ArchivosService } from 'src/archivos/service/archivos.service';

@ApiTags('auth')
@Controller('/auth')
export class AuthController {

    constructor(private authService: AuthService,
    ) {}

   


    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

}