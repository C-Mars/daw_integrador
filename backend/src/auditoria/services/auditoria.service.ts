import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Auditoria } from '../entities/auditoria.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividades } from 'src/actividades/entities/actividades.entities';

@Injectable()
export class AuditoriaService {

    constructor(@InjectRepository(Auditoria) private auditoriaRepo: Repository<Auditoria>){}


    async getAuditoriaActividad(id: Actividades): Promise<Auditoria[]>{
    

        const consulta = this.auditoriaRepo
        .createQueryBuilder('auditoria')
        .innerJoin('auditoria.actividadActual', 'actividad')

        
            consulta.where('actividad.id = :idActividad', {
                idActividad: id
            });
        
        return await consulta.getMany();
    }

    async obtenerAuditorias(): Promise<Auditoria[]>{
        const auditoria: Auditoria[] = await this.auditoriaRepo.find({
            
        });
        return auditoria;
    }
}