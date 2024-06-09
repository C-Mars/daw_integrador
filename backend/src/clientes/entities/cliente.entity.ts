import { Actividades } from 'src/actividades/entities/actividades.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Clientes{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombres:string;

    @Column()
    apellidos:string;

    @Column()
    email:string;

    @OneToMany(() => Actividades, (actividades) => actividades.idUsuarioModificacion) 
    actividades: Actividades[]; 
    
}