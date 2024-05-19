import { Module } from "@nestjs/common";
import { AuthController } from "./controllers/autn.controller";
import { AuthService } from "./services/auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Usuario } from "../usuarios/entities/usuario.entity";
import { UsuariosService } from "../usuarios/services/usuarios.service";
import { UsuariosModule } from "src/usuarios/usuarios.module";
import { ArchivosModule } from "src/archivos/archivos.module";
import { ArchivosService } from "src/archivos/service/archivos.service";


@Module({
    controllers:[AuthController],
    providers:[AuthService,UsuariosService, ArchivosService],
    imports:[TypeOrmModule.forFeature([Usuario]),UsuariosModule]
})
export class AuthModule{}
