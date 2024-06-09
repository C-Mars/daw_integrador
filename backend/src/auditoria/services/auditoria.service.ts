import { Injectable } from '@nestjs/common';
import { Auditoria } from '../entities/auditoria.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearAuditoriaDto } from '../dtos/crear-auditoria.dto';
import { ModificarAuditoriaDto } from '../dtos/modificar-auditoria.dto';
import { OperacionAuditoria } from '../enums/auditoriaEnum.enum';
import { Actividades } from 'src/actividades/entities/actividades.entities';
import { Usuario } from 'src/usuarios/entities/usuario.entity';
import { ActividadesService } from 'src/actividades/services/actividades.service';
import { UsuariosService } from 'src/usuarios/services/usuarios.service';
import { RolesEnum } from 'src/auth/enums/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';


@Injectable()
export class AuditoriaService {

    constructor(
        @InjectRepository(Auditoria) private auditoriaRepo: Repository<Auditoria>,
        //private actividadesService: ActividadesService,
        //private usuarioService: UsuariosService,
        //private clienteService: ClientesService
    ) {}

    async crearAuditoriaActividad(crearAuditoriaDto: CrearAuditoriaDto, auditoria:Auditoria){
        const auditoriaActividad: Auditoria = this.auditoriaRepo.create();
        // auditoriaActividad.actividadActual = crearAuditoriaDto.idActividad;
        // auditoriaActividad.idCliente = crearAuditoriaDto.idCliente;
        auditoriaActividad.descripcion = crearAuditoriaDto.descripcion;
        auditoriaActividad.id = crearAuditoriaDto.idUsuarioActual;
        auditoriaActividad.prioridad = crearAuditoriaDto.prioridad;
        auditoriaActividad.id = crearAuditoriaDto.idUsuarioModificion;
        auditoriaActividad.fechaModificacion = new Date();
        auditoriaActividad.fechaInicio = crearAuditoriaDto.fechaInicio;
        auditoriaActividad.estado = crearAuditoriaDto.estado;
        // auditoriaActividad.operacion= crearAuditoriaDto.operacion.CREACION;
        
        return await this.auditoriaRepo.save(auditoriaActividad);
    }

    // async buscarAuditoriaActividades(usuario: Usuario): Promise<Auditoria[]>{
    //     //const AuditoriaActividades: Auditoria[] =  await this.auditoriaRepo.find();
    //     const rol: RolesEnum = usuario.rol

    //     // const consulta = this.AuditoriaActividades
    //     .createQueryBuilder('auditoria')
    //     .innerJoin('auditoria.usuarioModificacion', 'usuario');

    //     if(rol === RolesEnum.ADMINISTRADOR){
    //         consulta.select()
    //     }
    //     return await consulta.getMany();
    // }

    // async editarAuditoriaActividad(id: Auditoria, modificarAuditoriaDto: ModificarAuditoriaDto, 
        // usuario: Usuario): Promise<Auditoria>{
        // const modAuditoriaAcitividad: Auditoria = this.auditoriaRepo.findOne({
        //     where:{
        //         id,
        //         estado,
        //         operacion,
        //     }
        // });
        // const rol: RolesEnum = usuario.rol;
        
        // if(rol === RolesEnum.ADMINISTRADOR){
        // modAuditoria.estado = modificarAuditoriaDto.estado;
        // modAuditoria.operacion = modificarAuditoriaDto.OperacionAuditoria.MODIFICACION;

        // await this.auditoriaRepo.save(modAuditoriaAcitividad);
    //  }
//    }

//    async eliminarAuditoriaActividad(id: Auditoria, usuario: Usuario): Promise<Auditoria>{
    // const rol: RolesEnum = usuario.rol;

    // if(rol === RolesEnum.ADMINISTRADOR || RolesEnum.EJECUTOR){
        // await this.delAuditoriaActividad: Auditoria = this.auditoriaRepo.delete(id)
//    }
// }}
}