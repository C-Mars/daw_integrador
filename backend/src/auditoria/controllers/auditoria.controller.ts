import { Controller, Get, Param, ParseIntPipe, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuditoriaService } from '../services/auditoria.service';

import { Auditoria } from '../entities/auditoria.entities';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { Actividades } from 'src/actividades/entities/actividades.entities';
import { AuthGuard } from 'src/auth/guards/auth.guard';


@ApiTags('auditoria')
@Controller('auditoria')
export class AuditoriaController {
    constructor(private readonly auditoriaService: AuditoriaService){}
    
    @Get('/todo')
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    async getAuditorias(): Promise<Auditoria[]> {
       return await this.auditoriaService.obtenerAuditorias();
    }

    @Get(':id')
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    async auditoriaActividad(@Param('id', ParseIntPipe) id: Actividades): Promise<Auditoria[]> {
        return await this.auditoriaService.getAuditoriaActividad(id);
    }
   }
     

