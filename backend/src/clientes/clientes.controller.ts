import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards

} from "@nestjs/common";

import { ValidationPipe } from "@nestjs/common/pipes";

import { CreateClientesDto } from "./dto/create-clientes.dto";

import { UpdateClientesDto } from "src/clientes/dto/update-clientes.dto";

import { ClientesService } from "./clientes.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { RolesEnum } from "src/auth/enums/roles.enum";
import { Roles } from "src/auth/decorators/roles.decorator";
import { AuthGuard } from "src/auth/guards/auth.guard";

@Controller("clientes")
export class ClientesController {

    constructor(private clienteService: ClientesService) {
    }

    @Get()
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    getAllClientes() {

        return this.clienteService.getAllCliente();
    }

    @Post()
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    addNewCliente(@Body(ValidationPipe) data: CreateClientesDto) {
        return this.clienteService.addNewCliente(data);
    }
    @Patch(":id")
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    UpdateCliente(@Param("id") id: string, @Body() UpdateClienteDto: UpdateClientesDto) {
        return this.clienteService.UpdateCliente(UpdateClienteDto, id);
    }
    @Delete("id")
    @ApiBearerAuth()
    @Roles([RolesEnum.ADMINISTRADOR])
    @UseGuards(AuthGuard)
    deleteCliente(@Param("id") id: string) {
        return this.clienteService.deleteCliente(id);
    }

}


