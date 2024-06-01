import { Controller, Delete, Get, Patch, UseGuards, Param, ParseIntPipe, Body, Post, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesEnum } from '../../auth/enums/roles.enum';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Usuario } from '../entities/usuario.entity';
import { EditarUsuario } from '../dto/editar-usuario.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { fileFilter } from '../../archivos/helpers/archivosfiltro.helper';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ArchivosService } from 'src/archivos/service/archivos.service';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';

@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService,
    private archivosService: ArchivosService
  ) { }
// Crear Usuarios-----------------------------------------------------------------------------
  @Post()
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
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
              cb(null, `${cambioNombre}${foto ? extname(foto.originalname) : ''}`);
          },
      })
  }))
async registrarUsuario(
  @Body() crearUsuarioDto: CrearUsuarioDto,
  @UploadedFile() foto: Express.Multer.File) {

      
      if (foto) {
          crearUsuarioDto.foto = foto.filename;
         
          await this.archivosService.guardarArchivo(foto);
      }

      // Registra por fin al usuario
      return await this.usuariosService.registroUsuario(crearUsuarioDto);
};
//Trae todos los usuarios-----------------------------------------------------------------------------

  @Get()
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async getUsuarios() {
    return await this.usuariosService.obtenerUsuarios();
  }
//Trae un usuario-----------------------------------------------------------------------------

  @Get(':id')
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async getUsuario(
    @Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return await this.usuariosService.findOneById(id);
  }

//Trae edita un usuario-----------------------------------------------------------------------------

  @Patch('editar/:id')
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
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
              cb(null, `${cambioNombre}${foto ? extname(foto.originalname) : ''}`);
          },
      })
  }))
async editarUsuario(
  @Param('id', ParseIntPipe) id: number,
  @Body() editarUsuarioDto: EditarUsuario,
  @UploadedFile() foto: Express.Multer.File) {
    if (foto) {
     editarUsuarioDto.foto = foto.filename;
     
      await this.archivosService.guardarArchivo(foto);
  }
      // Edita por fin al usuario
      return await this.usuariosService.editarUsuario( id ,editarUsuarioDto);
}



//Editar una contraseña de un usuario en particular-----------------------------------------------------------------------------

  @Patch('clave/:id')
  @ApiBearerAuth()
  @Roles([RolesEnum.EJECUTOR])
  @UseGuards(AuthGuard)
  async patchUsuariosContraseña(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarUsuarioDto: EditarUsuario,
  ) {
    return await this.usuariosService.editarUsuario(id, editarUsuarioDto);

  }
//Elimina usuario-----------------------------------------------------------------------------

  @Delete('eliminar/:id')
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async deleteUsuarios(
    @Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return await this.usuariosService.borrarUsuario(id);
    }
    

  }