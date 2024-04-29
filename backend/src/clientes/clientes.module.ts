import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClientesEntity } from "src/clientes/entities/clientes.entity";
import { ClientesController } from "./clientes.controller";
import { ClientesService } from "./clientes.service";

@Module({

imports: [TypeOrmModule.forFeature([ClientesEntity])],
controllers: [ClientesController],
providers: [ClientesService] 

})

export class ClientesModule{}