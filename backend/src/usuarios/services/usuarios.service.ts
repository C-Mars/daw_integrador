import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Usuario } from '../entities/usuario.entity';
import { Repository } from 'typeorm';
import { EstadosUsuarioEnum } from '../../auth/enums/estado-usuario.enum';
import { CrearUsuarioDto } from '../dto/crear-usuario.dto';
import { EditarUsuario } from '../dto/editar-usuario.dto';
import * as bcrypt from "bcrypt";
import { ArchivosService } from 'src/archivos/service/archivos.service';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) 
    private usuariosRepo: Repository<Usuario>,
    private archivosService: ArchivosService
  ) {}




   async registroUsuario(crearUsuarioDto: CrearUsuarioDto):Promise<Usuario>{
    const { nombres, apellidos, clave, nombreUsuario, email, rol } = crearUsuarioDto;
    const usuEmail = await this.obtenerUsuarioPorEmail(email)
    const usuNombre = await this.obtenerUsuarioPorNombreDeUsuario(nombreUsuario)
    
    
    if(usuEmail || usuNombre){
      throw new BadRequestException('El usuario ya existe');
    }

    const foto = crearUsuarioDto.foto;

    const usuario = await this.usuariosRepo.create({

      nombres,
      apellidos,
      clave: await bcrypt.hash(clave,10),
      nombreUsuario,
      email,
      foto,
      rol
    });
    return await this.usuariosRepo.save(usuario);
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

  async obtenerUsuariosTodos(): Promise<Usuario[]> {
    const usuarios: Usuario[] = await this.usuariosRepo.find({

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
    const usuario= await this.usuariosRepo.findOne({
      where: {
        id
      },
    });
    
    if (!usuario) {
      throw new UnauthorizedException(
        'El usuario no existe',
      );
    }
    Object.assign(usuario, editarUsuario);

   return await this.usuariosRepo.save(usuario);

}
async guardarFoto(id: number, foto: Express.Multer.File)
  : Promise<string> 
  {
    const usuario= await this.usuariosRepo.findOne({
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
    const nombreArchivo = await this.archivosService.guardarArchivo(foto);
    
    usuario.foto = nombreArchivo;
    
    await this.usuariosRepo.save(usuario);

    return nombreArchivo;
  }
  
  async getStaticFoto(imageName:string){
    const path =join(__dirname, '../../../static/usuarios', imageName)
    if(!existsSync(path)){
      throw new BadRequestException(`No se encuentra la imagen del usuario:  ${imageName}`)
    }
    return path; 
  }
}