import { BadRequestException, Body, Controller, Post, UploadedFile, UseInterceptors } from "@nestjs/common";
import { LoginDto } from "../dtos/login.dto";
import { AuthService } from "../services/auth.service";
import { RegistroUsuarioDto } from "../dtos/registro.dto";
import { ApiTags } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { ArchivoUsuarioDto } from "../dtos/archivo-usuario.dto";
import { fileFilter } from "src/files/helpers/archivosfiltro.helper";
import { diskStorage } from "multer";
import { extname } from "path";

@ApiTags('auth')
@Controller('/auth')
export class AuthController{

    constructor(private AuthService :AuthService){
        
    }

    @Post('/registro')
    async registroUsuario(
        @Body() regisroUsuarioDto:RegistroUsuarioDto){
        return await this.AuthService.registroUsuario(regisroUsuarioDto)
    };
    
    

    @Post('/login')
    async login(@Body() loginDto:LoginDto){
        // console.log('auth funciona')
        return await this.AuthService.login(loginDto);
    }

    
  
 
//   @Post('/registro')
//   @UseInterceptors(FileInterceptor('file', {
//     fileFilter: fileFilter,
//     storage: diskStorage({
//       destination: '/backend/static/usuarios',
//       filename: (req, file, cb) => {
//         const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
//         cb(null, `${randomName}${extname(file.originalname)}`);
//       },
//         })
//   }))
//   async subirAvatar(
//     @Body() registroUsuarioDto: RegistroUsuarioDto,
//     @UploadedFile() file: Express.Multer.File) {
        
//     registroUsuarioDto.foto = file.filename
    
//     if (!file){
//       throw new BadRequestException('El archivo no corresponde a una imagen');
//     }
//     return await this.AuthService.registroUsuario(registroUsuarioDto)
//   }
}