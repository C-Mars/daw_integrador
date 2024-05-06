import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Clientes } from "src/clientes/entities/clientes.entity";
import { ClientesController } from "src/clientes/controller/clientes.controller";
import { ClientesService } from "./service/clientes.service";

import { UsuariosModule } from "src/usuarios/usuarios.module";

@Module({

imports: [TypeOrmModule.forFeature([Clientes]), UsuariosModule],
controllers: [ClientesController],
providers: [ClientesService] 

})

export class ClientesModule{}