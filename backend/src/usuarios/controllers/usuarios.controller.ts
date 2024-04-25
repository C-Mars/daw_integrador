import { Controller, Delete, Get, Patch, UseGuards,Param, ParseIntPipe } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesEnum } from '../../auth/enums/roles.enum';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Usuario } from '../entities/usuario.entity';
import { EstadosUsuarioEnum } from 'src/auth/enums/estado-usuario.enum';

@ApiTags('usuarios')
@Controller('/usuarios')
export class UsuariosController {
  constructor(private usuariosService: UsuariosService) {}

  
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
  async getUsuario(@Param('id', ParseIntPipe) id:number):Promise<Usuario> {
    return await this.usuariosService.findOneById(id);
  }
  
  @Patch()
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async patchUsuarios() {
    // return await this.usuariosService.patchUsuarios();
  }

  @Delete(':id')
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async deleteUsuarios(@Param('id', ParseIntPipe) id:number): Promise<Usuario> { // Aquí asigna el estado de usuario que desees borrar
      return await this.usuariosService.borrarUsuario(id);
  }
}