import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Auditoria } from '../entities/auditoria.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividades } from 'src/actividades/entities/actividades.entities';

@Injectable()
export class AuditoriaService {

    constructor(@InjectRepository(Auditoria) private auditoriaRepo: Repository<Auditoria>){}


    async getAuditoriaActividad(id: Actividades): Promise<Auditoria[]> {
        const auditorias = await this.auditoriaRepo
            .createQueryBuilder('auditoria')
            .leftJoinAndSelect('auditoria.actividadActual', 'actividad')
            .leftJoinAndSelect('auditoria.clienteActual', 'cliente')
            .leftJoinAndSelect('auditoria.usuarioActual', 'usuarioActual')
            .leftJoinAndSelect('auditoria.usuarioModificacion', 'usuarioModificacion')
            .where('actividad.id = :idActividad', { idActividad: id })
            .getMany();
        
        return auditorias;
    }

    async obtenerAuditorias(): Promise<Auditoria[]>{
        const auditoria: Auditoria[] = await this.auditoriaRepo.find();
        return auditoria;
    }
}