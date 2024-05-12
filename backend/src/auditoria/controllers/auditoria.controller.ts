import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CrearActividadDto } from 'src/actividades/dtos/crear-actividad.dto';
import { ModificarAuditoriaDto } from '../dtos/modificar-auditoria.dto';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuditoriaService } from '../services/auditoria.service';
import { CrearAuditoriaDto } from '../dtos/crear-auditoria.dto';
import { Auditoria } from '../entities/auditoria.entities';
import { RolesEnum } from 'src/auth/enums/roles.enum';


@ApiTags('auditoria')
@Controller('auditoria')
export class AuditoriaController {
    constructor(private readonly auditoriaService: AuditoriaService){}

//     @Post()
//     @ApiBearerAuth()
//     @Roles([RolesEnum.ADMINISTRADOR])
//     @UseGuards(AuthGuard)
//     async crearAuditorias(@Body() crearAuditoriasDto: CrearAuditoriaDto): Promise<Auditoria>{
//         return  await this.auditoriaService.crearAuditoriaActividad(crearAuditoriasDto);
//     }

//     @Patch(':id')
//     @ApiBearerAuth()
//     @Roles([RolesEnum.ADMINISTRADOR])
//     @UseGuards(AuthGuard)
//     async modificarAuditorias(@Param('id', ParseIntPipe) id: number, 
//     @Body() modificarAuditoriaDto: ModificarAuditoriaDto): Promise<Auditoria> {
//         return await this.auditoriaService.editarAuditoriaActividad(id, modificarAuditoriaDto)
//     } 

//     @Get()
//     @ApiBearerAuth()
//     @Roles([RolesEnum.ADMINISTRADOR])
//     @UseGuards(AuthGuard)
//     async getAllAuditorias(): Promise<Auditorias[]>{
//         return await this.auditoriaService.buscarAuditoriaActividades();
//     }

//     @Delete(':id')
//     @ApiBearerAuth()
//     @Roles([RolesEnum.ADMINISTRADOR, RolesEnum.EJECUTOR])
//     @UseGuards(AuthGuard)
//     async eliminarAuditoria(@Param('id', ParseIntPipe) id: number) Promise<Auditoria>{
//         return await this.auditoriaService.eliminarAuditoriaActividad(id);
//     }
}
