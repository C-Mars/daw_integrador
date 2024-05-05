import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { EstadosUsuarioEnum } from '../../auth/enums/estado-usuario.enum';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { EditarUsuario } from '../dto/editar-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuariosRepo: Repository<Usuario>,
  ) {}

  async crearUsuario(crearUsuarioDto:CrearUsuarioDto):Promise<Usuario>{
    return await this.usuariosRepo.save(crearUsuarioDto)
  }
  
  async obtenerUsuarioPorEmail(
    email: string,
  ): Promise<Usuario> {
    const usuEmail: Usuario = await this.usuariosRepo.findOne({
      where: {
        email: email,
        estado: EstadosUsuarioEnum.ACTIVO,
      },
    });

    return usuEmail;
  }
  

  
  async obtenerUsuarioPorNombreDeUsuario(
    nombreUsuario: string,
  ): Promise<Usuario> {
    const usuNombre: Usuario = await this.usuariosRepo.findOne({
      where: {
        nombreUsuario: nombreUsuario,
        estado: EstadosUsuarioEnum.ACTIVO,
      },
    });

    return usuNombre;
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
        'El usuario no existe',
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
        'El usuario no existe',
      );
    }
    await this.usuariosRepo.delete(id);

    return usuario
  }
  // async eliminarUsuarioPorNombresApellidosUsuario(
  //   nombres: string,
  //   apellidos: string
  // ): Promise<Usuario> {
  //   const usuario: Usuario = await this.usuariosRepo.findOne({
  //     where: {
  //       nombres: nombres,
  //       apellidos: apellidos,
  //       estado: EstadosUsuarioEnum.ACTIVO,
  //     },
  //   });

  //   return usuario;
  // }

  async editarUsuario(id: number, editarUsuario: EditarUsuario)
  // : Promise<Usuario> 
  {
    const existeUsu= await this.usuariosRepo.findOne({
      where: {
        id,
        estado: EstadosUsuarioEnum.ACTIVO,
      },
    });
    if (!existeUsu) {
      throw new UnauthorizedException(
        'El usuario no existe',
      );
    }
    await this.usuariosRepo.update({id}, editarUsuario)
    const usuarioeditado = await this.usuariosRepo.findOne({
      where:{
        id,
        estado: EstadosUsuarioEnum.ACTIVO
      },
    });
    
    return usuarioeditado
    
  }

  
  
}
