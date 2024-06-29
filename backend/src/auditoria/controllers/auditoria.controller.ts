import { Controller, Get, UseGuards} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuditoriaService } from '../services/auditoria.service';
import { Auditoria } from '../entities/auditoria.entities';
import { RolesEnum } from 'src/auth/enums/roles.enum';
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
   }
     

