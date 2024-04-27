import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividades } from '../entities/actividades.entities';
import { Repository } from 'typeorm';
import { CrearActividadDto } from '../dtos/crear-actividad.dto';
import { UsuariosService } from 'src/usuarios/services/usuarios.service';
import { EstadoActividad } from '../enums/estado-actividad.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
//import { Usuario } from 'src/usuarios/entities/usuario.entity';




@Injectable()
export class ActividadesService{
    constructor(
        @InjectRepository(Actividades) private actividadeRepo:Repository<Actividades>,
        private usuariosServices: UsuariosService,

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

    async crearActividad(crearActividadDTo: CrearActividadDto, usuario:Usuario){
       const nuevaActividad: Actividades = this.actividadeRepo.create(); 
       nuevaActividad.idCliente= crearActividadDTo.idCliente,
       nuevaActividad.descripcion= crearActividadDTo.descripcion,
       nuevaActividad.usuarioActual= await this.usuariosServices.findOneById(crearActividadDTo.idUsuarioActual);//await porque es una promesa lo que está buscando
       nuevaActividad.prioridad = crearActividadDTo.prioridad,
       nuevaActividad.UsuarioModificacion = usuario;
       nuevaActividad.estado= EstadoActividad.PENDIENTE 
    }

}

