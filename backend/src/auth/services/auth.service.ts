import { BadRequestException, Injectable } from "@nestjs/common";
import { loginDto } from "../dtos/login.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Repository } from "typeorm";


@Injectable()
export class AuthService{
    constructor(@InjectRepository(Usuario) private usuariosRepo:Repository<Usuario>){

    }

    async login(loginDto:loginDto){
        // console.log('funciona service');
        const usuario:Usuario = await this.usuariosRepo.findOne({
            where:{
                nombreusuario:loginDto.nombreUsuario,
            },
        });
        if(!Usuario){
            throw new BadRequestException('Nombre de usuario no valido')
        }
    }
}