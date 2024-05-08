import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateClientesDto } from "../dto/create-clientes.dto";
import { UpdateClientesDto } from "../dto/update-clientes.dto";
import { Clientes } from "../entities/clientes.entity";
import { Repository } from "typeorm";

@Injectable()
export class ClientesService{
UpdateCliente: any;
    deleteCliente: any;

constructor(
@InjectRepository(Clientes) private repo: Repository<Clientes>
){}

async getAllCliente(){
    return await this.repo.find();
}

async addNewCliente(CreateClientesDto: CreateClientesDto){

    const cliente=new Clientes();
    const { nombres,apellidos, email} = CreateClientesDto;
    cliente.nombres = nombres;
    cliente.apellidos = apellidos;
    cliente.email = email;

    this.repo.create(cliente);
    return this.repo.save(cliente);
}


}