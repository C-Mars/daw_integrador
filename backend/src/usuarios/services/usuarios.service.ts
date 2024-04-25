import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { EstadosUsuarioEnum } from '../../auth/enums/estado-usuario.enum';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuariosRepo: Repository<Usuario>,
  ) {}

  crearUsuario(crearUsuarioDto:CrearUsuarioDto){
    return this.usuariosRepo.save(crearUsuarioDto)
  }
  
  async obtenerUsuarioPorEmaildeUsuario(
    email: string,
  ): Promise<Usuario> {
    const usuario: Usuario = await this.usuariosRepo.findOne({
      where: {
        email: email,
        estado: EstadosUsuarioEnum.ACTIVO,
      },
    });

    return usuario;
  }

  
  async obtenerUsuarioPorNombreDeUsuario(
    nombreUsuario: string,
  ): Promise<Usuario> {
    const usuario: Usuario = await this.usuariosRepo.findOne({
      where: {
        nombreUsuario: nombreUsuario,
        estado: EstadosUsuarioEnum.ACTIVO,
      },
    });

    return usuario;
  }

  async obtenerUsuarios(): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this.usuariosRepo.find({
      where: {
        estado: EstadosUsuarioEnum.ACTIVO,
      },
    });

    return usuarios;
  }

  async findOneById(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepo.findOne({
      where: {
        id,
        estado: EstadosUsuarioEnum.ACTIVO,
      },
    });

    if (!usuario) {
      throw new UnauthorizedException(
        'No existe un usuario con ese nombre de usuario',
      );
    }
    return usuario;
  }

      
  async borrarUsuario(id: number): Promise<Usuario> {
    const usuario = await this.usuariosRepo.findOne({
      where: {
        id,
        estado: EstadosUsuarioEnum.ACTIVO,
      },
    });
    if (!usuario) {
      throw new UnauthorizedException(
        'No existe un usuario con ese nombre de Usuario',
      );
    }
    await this.usuariosRepo.delete(id);

    return usuario
  }

  // async editarUsuario(id: number): Promise<Usuario> {
  //   const usuario = await this.usuariosRepo.findOne({
  //     where: {
  //       id,
  //       estado: EstadosUsuarioEnum.ACTIVO,
  //     },
  //   });
  //   if (!usuario) {
  //     throw new UnauthorizedException(
  //       'No existe un usuario con ese nombre',
  //     );
  //   }
  //   await this.usuariosRepo.update({
  //     where: {
  //         nombres: nombres,
  //         apellidos:apellidos,
  //         email:email,
      
  //         foto:foto,
      
  //         rol: RolesEnum,
    
  //         nombreUsuario: nombreUsuario,

  //         clave:string,
  //         estado: EstadosUsuarioEnum.ACTIVO,
  //       },
  //   });

    // return usuario
  // }


  
}
