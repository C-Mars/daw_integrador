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
        private archivosService: ArchivosService
    ) {

    }

    @Post('/registro')
    @UseInterceptors(FileInterceptor('foto',
        {
            //Creo un filtro para que se fije que el archivo que subo sea formato imagen
            fileFilter: fileFilter,
            //Donde se va a guardar el archivo
            storage: diskStorage({
                destination: '/backend/static/usuarios',
                filename: (req, foto, cb) => {
                    //Lo hago para que el nombre que suba y se guarde en la BD sea distinto al archivo que subio el usuario
                    const cambioNombre = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
                    cb(null, `${cambioNombre}${extname(foto.originalname)}`);
                },
            })
        }))
    async registroUsuario(
        @Body() crearUsuarioDto: CrearUsuarioDto,
        @UploadedFile() foto: Express.Multer.File) {
        
            // console.log('Datos del usuario:', crearUsuarioDto);
            // console.log('Archivo recibido:', foto);
            // se fija en el Dto de crear usuario
            crearUsuarioDto.foto = foto.filename
            // Guardar el archivo en el sistema de archivos en la carpeta static/usuarios y obtener el nombre de dicho archivo
            await this.archivosService.guardarArchivo(foto);

            return await this.authService.registroUsuario(crearUsuarioDto);
    };



    @Post('/login')
    async login(@Body() loginDto: LoginDto) {
        return await this.authService.login(loginDto);
    }

}