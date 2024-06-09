import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clientes } from '../entities/cliente.entity';
import { Repository } from 'typeorm';
import { CrearClienteDto } from '../dto/crear-cliente.dto';
import { EditarClienteDto } from '../dto/editar-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(
    @InjectRepository(Clientes)
    private clientesRepo: Repository<Clientes>,
  ) {}

  async registroCliente(crearClienteDto: CrearClienteDto): Promise<Clientes> {
    const { nombres, apellidos, email } = crearClienteDto;

    const clienteExistente = await this.clientesRepo.findOne({ where: { email } });
    if (clienteExistente) {
      throw new BadRequestException('El cliente ya existe');
    }

    const cliente = this.clientesRepo.create({
      nombres,
      apellidos,
      email,
    });

    return await this.clientesRepo.save(cliente);
  }

  async obtenerClientePorEmail(email: string): Promise<Clientes> {
    return await this.clientesRepo.findOne({ where: { email } });
  }

  async obtenerClientes(): Promise<Clientes[]> {
    return await this.clientesRepo.find();
  }

  async findOneById(id: number): Promise<Clientes> {
    const cliente = await this.clientesRepo.findOne({ where: { id } });
    if (!cliente) {
      throw new UnauthorizedException('El cliente no existe');
    }
    return cliente;
  }

  async editarCliente(id: number, editarClienteDto: EditarClienteDto): Promise<Clientes> {
    const cliente = await this.findOneById(id);
    Object.assign(cliente, editarClienteDto);
    return await this.clientesRepo.save(cliente);
  }

  async borrarCliente(id: number): Promise<Clientes> {
    const cliente = await this.findOneById(id);
    await this.clientesRepo.remove(cliente);
    return cliente;
  }
}
