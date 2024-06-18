import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, Req, UseGuards, } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ActividadesService } from '../services/actividades.service';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Actividades } from '../entities/actividades.entities';
import { CrearActividadDto } from '../dtos/crear-actividad.dto';
import { EditarActividadDto } from '../dtos/editar-actividades.dto';

@ApiTags('actividades')
@Controller('/actividades')
export class ActividadesController {
  constructor(private actividadService: ActividadesService) {}

  @Post()
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async crearActividad(
    @Req() request: Request,
    @Body() crearActvidadDto: CrearActividadDto,
  ) {
    await this.actividadService.crearActividad(
      crearActvidadDto,
      request['usuario'],
    );
  }

  @Get(':id')
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async getActividad(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Actividades> {
    return await this.actividadService.obtenerActividadPorId(id);
  }

  @Get()
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR])
  @UseGuards(AuthGuard)
  async getActividades(): Promise<Actividades[]> {
    return await this.actividadService.obtenerTodasLasActividades();
  }

  @Patch(':id')
  @ApiBearerAuth()
  @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.EJECUTOR])
  @UseGuards(AuthGuard)
  async editarActividad(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarActividadDto: EditarActividadDto,
  ) {
    return await this.actividadService.editarActividad(id, editarActividadDto);
  }
}
