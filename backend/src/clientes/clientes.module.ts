import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientesEntity } from "src/clientes/entities/clientes.entity";
import { ClientesController } from "./clientes.controller";
import { ClientesService } from "./clientes.service";
import { UsuariosService } from "src/usuarios/services/usuarios.service";
import { UsuariosModule } from "src/usuarios/usuarios.module";

@Module({

imports: [TypeOrmModule.forFeature([ClientesEntity]), UsuariosModule],
controllers: [ClientesController],
providers: [ClientesService] 

})

export class ClientesModule{}