import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Actividades } from '../entities/actividades.entities';
import { Repository } from 'typeorm';
import { CrearActividadDto } from '../dtos/crear-actividad.dto';
import { UsuariosService } from 'src/usuarios/services/usuarios.service';
import { EstadoActividad } from '../enums/estado-actividad.enum';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { EditarActividadDto } from '../dtos/editar-actividades.dto';
//import { Usuario } from 'src/usuarios/entities/usuario.entity';




@Injectable()
export class ActividadesService {
    constructor(
        @InjectRepository(Actividades) private actividadesRepo: Repository<Actividades>,
        private usuariosServices: UsuariosService,

    ) { }

    
    async obtenerActividadPorId(id: number): Promise<Actividades> {
        const actividad = await this.actividadesRepo.findOne({
            where: {
                id
            }
        });
        if (!actividad) {
            throw new UnauthorizedException(
                'La actividad no existe'
            );
        }
        return actividad;
    }


    async crearActividad(crearActividadDto: CrearActividadDto, usuario: Usuario) {
        const nuevaActividad: Actividades = this.actividadesRepo.create();
        nuevaActividad.idCliente= crearActividadDto.idCliente,
        nuevaActividad.descripcion = crearActividadDto.descripcion;
        nuevaActividad.estado = EstadoActividad.PENDIENTE;
        nuevaActividad.fechaModificacion = new Date();
        nuevaActividad.fechaInicio = new Date();
        nuevaActividad.prioridad = crearActividadDto.prioridad;
        nuevaActividad.usuarioActual = await this.usuariosServices.findOneById(
            crearActividadDto.idUsuarioActual,
        );
        nuevaActividad.idUsuarioModificacion = await this.usuariosServices.findOneById(
            crearActividadDto.idUsuarioModificacion,
        );
        await this.actividadesRepo.save(nuevaActividad);
    }

    async getActividades(usuario: Usuario): Promise<Actividades[]> {
        const rol: RolesEnum = usuario.rol;

        const consulta = this.actividadesRepo
            .createQueryBuilder('actividad')
            .innerJoin('actividad.usuarioActual', 'usuario');

        if (rol === RolesEnum.EJECUTOR) {
            consulta.where('actividad.estado = :estado', {
                estado: EstadoActividad.PENDIENTE
            }).andWhere('usuario.id = :idUsuario', {
                idUsuario: usuario.id
            });
        }

        return await consulta.getMany();
    }
    
    
    async editarActividad(id: number, editaraAtividadDto: EditarActividadDto) {
        const actividad = await this.actividadesRepo.findOne({
            where:{
                id
            }
        });
        if (!actividad) {
            throw new UnauthorizedException('La actividad no existe');
        }
        
        actividad.estado = editaraAtividadDto.estado
        actividad.descripcion = editaraAtividadDto.descripcion;
        actividad.fechaInicio = editaraAtividadDto.fechaInicio;
        actividad.fechaModificacion = editaraAtividadDto.fechaModificacion;
        actividad.prioridad = editaraAtividadDto.prioridad
        actividad.idCliente = editaraAtividadDto.idCliente
       
    
       
        await this.actividadesRepo.save(actividad);
    
        return actividad;
    }
}
