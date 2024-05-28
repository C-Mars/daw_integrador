import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { EstadosUsuarioEnum } from '../../auth/enums/estado-usuario.enum';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { EditarUsuario } from '../dto/editar-usuario.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private usuariosRepo: Repository<Usuario>,
  ) {}


  async crearUsuario(crearUsuarioDto:CrearUsuarioDto):Promise<Usuario>{
    return await this.usuariosRepo.save(crearUsuarioDto)
  }

   async registroUsuario({nombres,apellidos,clave,nombreUsuario,email,foto,rol}:CrearUsuarioDto){

    const usuEmail = await this.obtenerUsuarioPorEmail(email)
    const usuNombre = await this.obtenerUsuarioPorNombreDeUsuario(nombreUsuario)
    
    
    if(usuEmail || usuNombre){
      throw new BadRequestException('El usuario ya existe');
    }
    return await this.crearUsuario({

      nombres,
      apellidos,
      clave: await bcrypt.hash(clave,10),
      nombreUsuario,
      email,
      foto,
      rol
    });
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
    
    usuario.estado = EstadosUsuarioEnum.BAJA
    
    await this.usuariosRepo.save(usuario);

    return usuario
  }

  async editarUsuario(id: number, editarUsuario: EditarUsuario)
  : Promise<Usuario> 
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
    const datosActualizados = {
      id: editarUsuario.id!as number, 
      nombres: editarUsuario.nombres!,
      apellidos:editarUsuario.apellidos!,
      clave: editarUsuario.clave!,
      nombreUsuario:editarUsuario.nombreUsuario!,
      email: editarUsuario.email!,
      foto: editarUsuario.foto!,
      rol: editarUsuario.rol!,
      estado: editarUsuario.estado!
    }
     
    await this.usuariosRepo.update({ id }, datosActualizados);
  
    return existeUsu

}
}
