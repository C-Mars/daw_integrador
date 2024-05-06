import { Actividades } from "src/actividades/entities/actividades.entities";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { OperacionAuditoria } from "../enums/auditoriaEnum.enum";
import { Clientes } from "src/clientes/entities/clientes.entity";

export class Auditoria{

    @PrimaryGeneratedColumn()
    id: number

    //Relacional, debo obtener el id de la actividad a la que se le realiza auditoria
    @OneToOne(()=>Actividades)
    @JoinColumn({name: 'idActividad'})
    actividadActual:Actividades

    @OneToOne(()=>Clientes)
    @JoinColumn({name: 'idCliente' })
    clienteActual: Clientes

    //Relacional, debo obtener el id del usuario asignado a la actividad?
    @OneToOne(()=>Usuario)
    @JoinColumn({name:'idUsuarioActual'})
    usuarioActual: Usuario

    //Relacional, debo obtener la prioridad heredada de la actividad?
    @Column()
    prioridad: string

    //Relacional, obtener id del usuario que modifica
    @OneToOne(()=>Usuario)
    @JoinColumn({name:'idUsuarioModificacion'})
    usuarioModificacion: Usuario

    //Relacional, obtener el id de la fecha de modificación
    @Column({type: 'time'})
    fechaModificacion: Date;

    //hora en que se realizó la modificiación
    @Column({type: 'time'})
    fechaInicio: Date;

    //Relacional, heredar el estado de la actividad?
    @Column()
    estado: string;

    //si es una modificación, creación o eliminación
    @Column({type: 'enum', enum: OperacionAuditoria})
    operacion: OperacionAuditoria;
}