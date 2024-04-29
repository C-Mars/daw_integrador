import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete

} from "@nestjs/common";

import { ValidationPipe } from "@nestjs/common/pipes";

import { CreateClientesDto } from "./dto/create-clientes.dto";

import { UpdateClientesDto } from "src/clientes/dto/update-clientes.dto";

import { ClientesService } from "./clientes.service";

@Controller("clientes")
export class ClientesController {

    constructor(private clienteService: ClientesService) {
    }
    @Get()
    getAllClientes() {

        return this.clienteService.getAllCliente();
    }

    @Post()
    addNewCliente(@Body(ValidationPipe) data: CreateClientesDto) {
        return this.clienteService.addNewCliente(data);
    }
    @Patch(":id")
    UpdateCliente(@Param("id") id: string, @Body() UpdateClienteDto: UpdateClientesDto) {
        return this.clienteService.UpdateCliente(UpdateClienteDto, id);
    }
    @Delete("id")
    deleteCliente(@Param("id") id: string) {
        return this.clienteService.deleteCliente(id);
    }

}


