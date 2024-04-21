import { BadRequestException, Injectable } from "@nestjs/common";
import { loginDto } from "../dtos/login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { EstadosUsuarioEnum } from "../enums/estado-usuario.enum";
import { JwtService } from "@nestjs/jwt";
import { UsuariosService } from './usuarios.service';

@Injectable()
export class AuthService{
    constructor(@InjectRepository(Usuario) private usuariosRepo:Repository<Usuario>,
    private jwtService: JwtService){

    }
    async login(loginDto: loginDto): Promise<{ token:string }> {
        const usuario: Usuario =
          await this.usuariosService.obtenerUsuarioPorNombreDeUsuario(
            loginDto.nombreUsuario,
          );
    // async login(loginDto:loginDto):Promise<{token:string}>{
    //     // console.log('funciona service');
    //     const usuario:Usuario = await this.usuariosRepo.findOne({
    //         where:{
    //             nombreusuario:loginDto.nombreUsuario,
    //             estado: EstadosUsuarioEnum.ACTIVO
    //         },
    //     });
        console.log(usuario)
        if(!usuario){
            throw new BadRequestException('Nombre de usuario no valido')
        }
        const claveCorrecta:boolean = bcrypt.compare(
            loginDto.clave, 
            usuario.clave
        );
        if(!claveCorrecta){
            throw new BadRequestException('clave incorrecta')             
        }
        const token:string = this.jwtService.sign({
            sub: usuario.id,
            rol: usuario.rol
        });
        return {token}
    }
}