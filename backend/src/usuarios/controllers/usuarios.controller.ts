import { Controller, Delete, Get, Patch, UseGuards, Param, ParseIntPipe, Body, Post, UseInterceptors, UploadedFile, BadRequestException, Res } from '@nestjs/common';
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
import { ConfigService } from '@nestjs/config';
import { ArchivosService } from 'src/archivos/service/archivos.service';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { Response } from 'express';
import { fileNamer } from 'src/archivos/helpers/archivosnombre.helper';
import { AjustesUsuario } from '../dto/ajustes-usuario.dto';

@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuariosController  {
  constructor(private usuariosService: UsuariosService,
    private archivosService: ArchivosService,
    private configService:ConfigService
   
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
          destination: '../../../static/usuarios',
          filename: fileNamer,
  })
  }))
async registrarUsuario(
  @Body() crearUsuarioDto: CrearUsuarioDto,
  @UploadedFile() foto: Express.Multer.File) {
      if (foto) {
          crearUsuarioDto.foto  = await this.archivosService.guardarArchivo(foto); 
        // Creo que no va (crearUsuarioDto.fotoUrl = `${ this.configService.get('HOST_API') }/usuarios/foto/${ foto.filename }`; 
  }

      // Registra por fin al usuario
      return await this.usuariosService.registroUsuario(crearUsuarioDto);
};
//Trae todos los usuarios activos-----------------------------------------------------------------------------

  @Get()
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async getUsuarios() {
    return await this.usuariosService.obtenerUsuarios();
  }

//Trae todos los usuarios--------------------------------------------------------------------------------------
@Get('/todos')
@ApiBearerAuth()
@Roles([RolesEnum.ADMINISTRADOR])
@UseGuards(AuthGuard)
async getUsuariosTodos() {
  return await this.usuariosService.obtenerUsuariosTodos();
}
//Trae un usuario----------------------------------------------------------------------------------------------

  @Get(':id')
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async getUsuario(
    @Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return await this.usuariosService.findOneById(id);
  }
// Tre la foto del usuario------------------------------------------------------------------------------------------
  @Get('foto/:imageName')
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async getfoto(
    @Res() res: Response,
    @Param('imageName') imageName: string ){
    const path = await this.usuariosService.getStaticFoto(imageName);
    res.sendFile(path);
  }

//Edita un usuario-----------------------------------------------------------------------------

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
          filename: fileNamer,
      })
  }))
  async editarUsuario(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarUsuarioDto: EditarUsuario,
    @UploadedFile() foto: Express.Multer.File) {
      if (foto) {
        editarUsuarioDto.foto  = await this.archivosService.guardarArchivo(foto); 
        //Extra(creo que no va)
        // editarUsuarioDto.fotoUrl = `http://localhost:3000/api/usuarios/foto/${ foto.filename }`; 
      }
    // Edita por fin al usuario
    return await this.usuariosService.editarUsuario( id ,editarUsuarioDto);
    }    
   
    
       
//Editar una contraseña  y nombre de un usuario en particular-----------------------------------------------------------------------------

  @Patch('clave/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async patchUsuariosContraseña(
    @Param('id', ParseIntPipe) id: number,
    @Body() ajustesUsuarioDto: AjustesUsuario,
  ) {
    return await this.usuariosService.ajustesUsuario(id, ajustesUsuarioDto);
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