import { BadRequestException, Injectable } from "@nestjs/common";
import { LoginDto} from "../dtos/login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { EstadosUsuarioEnum } from "../enums/estado-usuario.enum";
import { JwtService } from "@nestjs/jwt";
import { UsuariosService } from "../../usuarios/services/usuarios.service";
import { RegistroUsuarioDto } from "../dtos/registro.dto";

@Injectable()
export class AuthService {
  constructor(
    private usuariosService: UsuariosService,
    private jwtService: JwtService,
  ) {}
  async registroUsuario({nombres,apellidos,clave,nombreUsuario,email,rol,estado}:RegistroUsuarioDto){

    const usuario = await this.usuariosService.obtenerUsuarioPorEmaildeUsuario(email)
    
    if(usuario){
      throw new BadRequestException('El usuario ya existe');
    }
    return await this.usuariosService.crearUsuario({nombres,apellidos,clave,nombreUsuario,email,rol,estado})
  }


  async login(loginDto:LoginDto): Promise<{ token: string }> {
    const usuario: Usuario =
      await this.usuariosService.obtenerUsuarioPorNombreDeUsuario(
        loginDto.nombreUsuario,
      );

    if (!usuario) {
      throw new BadRequestException('Nombre de usuario no válido');
    }

    const claveCorrecta: boolean = bcrypt.compareSync(
      loginDto.clave,
      usuario.clave,
    );

    if (!claveCorrecta) {
      throw new BadRequestException('Clave incorrecta');
    }

    const token: string = this.jwtService.sign({
      sub: usuario.id,
      rol: usuario.rol,
    });

    return { token };
  }
}
