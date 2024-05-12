import { Actividades } from "src/actividades/entities/actividades.entities";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { OperacionAuditoria } from "../enums/auditoriaEnum.enum";
import { Clientes } from "src/clientes/entities/clientes.entity";
import { EstadoActividad } from "src/actividades/enums/estado-actividad.enum";

export class Auditoria{

    @PrimaryGeneratedColumn()
    id: number

    //Relacional, debo obtener el id de la actividad a la que se le realiza auditoria
    @OneToOne(()=>Actividades)
    @JoinColumn({name: 'idActividad'})
    actividadActual:Actividades

    @OneToOne(()=>Clientes)
    @JoinColumn({name: 'idCliente' })
    clienteActual: number
    
    @Column()
    descripcion: string;
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
    @Column({type: 'enum', enum:EstadoActividad})
    estado:EstadoActividad;
    nuevaActividad: Promise<Usuario>;

    //si es una modificación, creación o eliminación
    @Column({type: 'enum', enum: OperacionAuditoria})
    operacion: OperacionAuditoria;
}