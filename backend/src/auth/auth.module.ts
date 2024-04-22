import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/autn.controller";
import { AuthService } from "./services/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "../usuarios/entities/usuario.entity";
import { UsuariosService } from "../usuarios/services/usuarios.service";
import { UsuariosModule } from "src/usuarios/usuarios.module";


@Module({
    controllers:[AuthController],
    providers:[AuthService,UsuariosService],
    imports:[TypeOrmModule.forFeature([Usuario]),UsuariosModule ],
    exports:[]
})
export class AuthModule{}
