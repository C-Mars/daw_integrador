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

@Injectable()
export class ActividadesService {
  constructor(
    @InjectRepository(Actividades)
    private actividadesRepo: Repository<Actividades>,
    private usuariosServices: UsuariosService,
  ) {}

  // Obtenemos una actividad por su ID
  async obtenerActividadPorId(id: number): Promise<Actividades> {
    const actividad = await this.actividadesRepo.findOne({
      where: {
        id,
      },
    });
    if (!actividad) {
      throw new UnauthorizedException('La actividad no existe o fue eliminada');
    }
    return actividad;
  }

  // Obtenemos todas las actividades
  async obtenerTodasLasActividades(): Promise<Actividades[]> {
    return await this.actividadesRepo.find();
  }

  // Crear una nueva actividad
  async crearActividad(crearActividadDto: CrearActividadDto, usuario: Usuario) {
    const nuevaActividad: Actividades = this.actividadesRepo.create();
    nuevaActividad.idCliente = crearActividadDto.idCliente;
    nuevaActividad.descripcion = crearActividadDto.descripcion;
    nuevaActividad.estado = EstadoActividad.PENDIENTE;
    nuevaActividad.fechaModificacion = new Date();
    nuevaActividad.fechaInicio = new Date();
    nuevaActividad.prioridad = crearActividadDto.prioridad;
    nuevaActividad.usuarioActual = await this.usuariosServices.findOneById(
      crearActividadDto.idUsuarioActual,
    );
    nuevaActividad.idUsuarioModificacion =
      await this.usuariosServices.findOneById(
        crearActividadDto.idUsuarioModificacion,
      );
    await this.actividadesRepo.save(nuevaActividad);
  }

  // Obtener actividades según el rol del usuario
  async getActividades(usuario: Usuario): Promise<Actividades[]> {
    const rol: RolesEnum = usuario.rol;

    const consulta = this.actividadesRepo
      .createQueryBuilder('actividad')
      .innerJoin('actividad.usuarioActual', 'usuario');

    if (rol === RolesEnum.EJECUTOR) {
      consulta
        .where('actividad.estado = :estado', {
          estado: EstadoActividad.PENDIENTE,
        })
        .andWhere('usuario.id = :idUsuario', {
          idUsuario: usuario.id,
        });
    }

    return await consulta.getMany();
  }

  // Editar una actividad
  async editarActividad(id: number, editarActividadDto: EditarActividadDto) {
    const actividad = await this.actividadesRepo.findOne({
      where: {
        id,
      },
    });
    if (!actividad) {
      throw new UnauthorizedException('La actividad no existe o fue eliminada');
    }

    if (editarActividadDto.estado !== undefined) {
      actividad.estado = editarActividadDto.estado;
    }
    if (editarActividadDto.descripcion !== undefined) {
      actividad.descripcion = editarActividadDto.descripcion;
    }
    if (editarActividadDto.fechaInicio !== undefined) {
      actividad.fechaInicio = editarActividadDto.fechaInicio;
    }
    if (editarActividadDto.fechaModificacion !== undefined) {
      actividad.fechaModificacion = editarActividadDto.fechaModificacion;
    }
    if (editarActividadDto.prioridad !== undefined) {
      actividad.prioridad = editarActividadDto.prioridad;
    }
    if (editarActividadDto.idCliente !== undefined) {
      actividad.idCliente = editarActividadDto.idCliente;
    }

    await this.actividadesRepo.save(actividad);

    return actividad;
  }

  // Borrar una actividad
  async borrarActividad(id: number, usuario: Usuario) {
    const rol: RolesEnum = usuario.rol;

    if (rol === RolesEnum.EJECUTOR || rol === RolesEnum.ADMINISTRADOR) {
      await this.actividadesRepo.delete(id);
    }
  }
}

