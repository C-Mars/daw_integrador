import { Body, Controller, Get, Param, ParseIntPipe, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ActividadesService } from '../services/actividades.service';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Actividades } from '../entities/actividades.entities';
import { CrearActividadDto } from '../dtos/crear-actividad.dto';

@ApiTags('actividades')
@Controller('/actividades')
export class ActividadesController {
    constructor(private actividadService:ActividadesService) {}

    @Post()
    crearActividad(
    @Req() request:Request,
    @Body() crearActvidadDto: CrearActividadDto)
    {
        console.log(request)
        this.actividadService.crearActividad(crearActvidadDto, request['usuario'])
    }


    @Get(':id')
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    async getActividad(@Param('id',ParseIntPipe) id: number): Promise<Actividades> {
         return this.actividadService.obtenerActividadPorId(id);
    }

    @Get()
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    async getActividades(){}

    
}
