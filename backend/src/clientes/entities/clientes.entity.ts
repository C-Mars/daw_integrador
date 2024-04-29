import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity("clientes")

export class ClientesEntity{

@PrimaryGeneratedColumn()
id: string;

@Column()
nombres: string;


@Column()
apellidos: string;


@Column()
email: string;


}