import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividades } from '../entities/actividades.entities';
import { Repository } from 'typeorm';
//import { Usuario } from 'src/usuarios/entities/usuario.entity';




@Injectable()
export class ActividadesService{
    constructor(
        @InjectRepository(Actividades) private actividadeRepo:Repository<Actividades>
    ) {}

    //Obtenemos un array de actividades con un promise //no sé por qué el promise lo marca rojo @Mario
    //Por cierto, quería que busque todas las actividades, pero no hay una forma definida para buscarlas todas en un "where" @Mario
    async obtenerActividadPorId(id: number): Promise<Actividades>{
        const actividad = await this.actividadeRepo.findOne({
            where:{
                id 
            }
        });
        if(!actividad){
            throw new UnauthorizedException(
                'La actividad no existe'
            );
        }
        return actividad;
    }

}

