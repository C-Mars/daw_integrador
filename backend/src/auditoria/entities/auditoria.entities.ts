import { Actividades } from "src/actividades/entities/actividades.entities";
import { Usuario } from "src/usuarios/entities/usuario.entity";
import { PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, Entity } from "typeorm";
import { OperacionAuditoria } from "../enums/auditoriaEnum.enum";
import { Clientes } from "src/clientes/entities/cliente.entity";
import { EstadoActividad } from "src/actividades/enums/estado-actividad.enum";
import { PrioridadActividad } from "src/actividades/enums/prioridad-actividad.enum";

@Entity('auditoria_actividades')
export class Auditoria{

    @PrimaryGeneratedColumn()
    id: number

    //Relacional, debo obtener el id de la actividad a la que se le realiza auditoria
    @ManyToOne(()=>Actividades)
    @JoinColumn({name: 'idActividad'})
    actividadActual: Actividades

    @OneToOne(()=>Clientes)
    @JoinColumn({name: 'idCliente' })
    clienteActual: Clientes
    
    @Column()
    descripcion: string;
    //Relacional, debo obtener el id del usuario asignado a la actividad?
    @OneToOne(()=>Usuario)
    @JoinColumn({name:'idUsuarioActual'})
    usuarioActual: Usuario;

    @Column({type: 'enum', enum: PrioridadActividad})
    prioridad: PrioridadActividad;

    //Relacional, obtener id del usuario que modifica
    @OneToOne(()=>Usuario)
    @JoinColumn({name:'idUsuarioModificacion'})
    usuarioModificacion: Usuario;

    //Relacional, obtener el id de la fecha de modificación
    @Column({type: 'time'})
    fechaModificacion: Date;

    //hora en que se realizó la modificiación
    @Column({type: 'time'})
    fechaInicio: Date;

    //Relacional, heredar el estado de la actividad?
    @Column({type: 'enum', enum:EstadoActividad})
    estado:EstadoActividad;

    //si es una modificación, creación o eliminación
    @Column({type: 'enum', enum: OperacionAuditoria})
    operacion: OperacionAuditoria;
}