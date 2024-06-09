import { Controller, Get, Post, Patch, Delete, Param, Body, ParseIntPipe } from '@nestjs/common';
import { ClientesService } from '../services/clientes.service';
import { Cliente } from '../entities/cliente.entity';
import { CrearClienteDto } from '../dto/crear-cliente.dto';
import { EditarClienteDto } from '../dto/editar-cliente.dto';

@Controller('/clientes')
export class ClientesController {
  constructor(private clientesService: ClientesService) {}

  @Post()
  async registrarCliente(@Body() crearClienteDto: CrearClienteDto) {
    return await this.clientesService.registroCliente(crearClienteDto);
  }

  @Get()
  async getClientes() {
    return await this.clientesService.obtenerClientes();
  }

  @Get(':id')
  async getCliente(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return await this.clientesService.findOneById(id);
  }

  @Patch('editar/:id')
  async editarCliente(
    @Param('id', ParseIntPipe) id: number,
    @Body() editarClienteDto: EditarClienteDto,
  ) {
    return await this.clientesService.editarCliente(id, editarClienteDto);
  }

  @Delete('eliminar/:id')
  async deleteCliente(@Param('id', ParseIntPipe) id: number): Promise<Cliente> {
    return await this.clientesService.borrarCliente(id);
  }
}
