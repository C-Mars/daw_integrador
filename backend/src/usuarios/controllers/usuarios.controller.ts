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

@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService,
    private archivosService: ArchivosService
  ) { }


  @Get()
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async getUsuarios() {
    return await this.usuariosService.obtenerUsuarios();
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async getUsuario(
    @Param('id', ParseIntPipe) id: number): Promise<Usuario> {
    return await this.usuariosService.findOneById(id);
  }


  @Patch(':id')
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async patchUsuarios(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarUsuarioDto: EditarUsuario) {
    return await this.usuariosService.editarUsuario(id, editarUsuarioDto);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles([RolesEnum.EJECUTOR])
  @UseGuards(AuthGuard)
  async patchUsuariosContraseña(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarUsuarioDto: EditarUsuario) {
    return await this.usuariosService.editarUsuario(id, editarUsuarioDto);
    
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async deleteUsuarios(
    @Param('id', ParseIntPipe) id: number): Promise<Usuario> { 
    return await this.usuariosService.borrarUsuario(id);
  }

  @Patch('avatar/:id')
  @UseInterceptors(FileInterceptor('file', {
    //Creo un filtro para que se fije que el archivo que subo sea formato imagen
    fileFilter: fileFilter,
    //Donde se va a guardar el archivo
    storage: diskStorage({
      destination: '/backend/static/usuarios',
      filename: (req, file, cb) => {
        //Lo hago para que el nombre que suba y se guarde en la BD sea distinto al archivo que subio el usuario
        const cambioNombre = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');
        cb(null, `${cambioNombre}${extname(file.originalname)}`);
      },
    })
  }))
  async subirAvatar(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarUsuarioDto: EditarUsuario,
    @UploadedFile() file: Express.Multer.File) {

    // se fija en el Dto de editarUsuaro
    editarUsuarioDto.foto = file.filename

    // Guardar el archivo en el sistema de archivos en la carpeta static/usuarios y obtener el nombre de dicho archivo
    const nombreArchivo = await this.archivosService.guardarArchivo(file);

    // Actualiza la entidad(entity) de usuario con el nombre del archivo
    const usuarioFotoDto: EditarUsuario = {
      foto: `${nombreArchivo}`, // Ruta relativa al archivo guardado
    };

    // Actualiza el usuario con la nueva foto 
    await this.usuariosService.editarUsuario(id, editarUsuarioDto);
    return usuarioFotoDto
  }
}

