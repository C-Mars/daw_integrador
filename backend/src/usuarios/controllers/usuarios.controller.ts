import { Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { UsuariosService } from '../services/usuarios.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { RolesEnum } from '../../auth/enums/roles.enum';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

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

  @Patch()
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async patchUsuarios() {
    return await this.usuariosService.obtenerUsuarios();

  }@Delete()
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async deleteUsuarios() {
    return await this.usuariosService.obtenerUsuarios();
  }
}