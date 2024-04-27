import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { ActividadesService } from '../services/actividades.service';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { Actividades } from '../entities/actividades.entities';

@ApiTags('actividades')
@Controller('/actividades')
export class ActividadesController {
    constructor(private actividadService:ActividadesService) {}

    @Get()
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    async getActividades() {
        // return this.actividadService.obtenerActividadPorId(id);
    }

}
