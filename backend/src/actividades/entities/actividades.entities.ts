import { PrimaryGeneratedColumn, Column, Entity, ManyToOne, JoinColumn } from "typeorm"
import { EstadoActividad } from "../enums/estado-actividad.enum"
import { PrioridadActividad } from "../enums/prioridad-actividad.enum"
import { Usuario } from "src/usuarios/entities/usuario.entity"
import { Clientes } from "src/clientes/entities/clientes.entity";

@Entity()
export class Actividades{
 
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Clientes)
    @JoinColumn({name:'idCliente'})
    idCliente: number;

    @Column()
    descripcion: string;


    //relacionamos varias actividades con único usuario
    @ManyToOne(()=>Usuario)
    @JoinColumn({name:'idUsuarioActual'})
    usuarioActual:Usuario;
    
    @Column({type: 'enum', enum:PrioridadActividad})
    prioridad: PrioridadActividad;

    //Columna relacional, debo obtener el id del usuario que modifica
    @ManyToOne(()=>Usuario)
    @JoinColumn({name: 'idUsuarioModificacion'})
    idUsuarioModificacion: Usuario;

    @Column()
    fechaModificacion: Date;
   
    @Column()
    fechaInicio: Date;

    @Column({type: 'enum', enum:EstadoActividad})
    estado:EstadoActividad;
    nuevaActividad: Promise<Usuario>;

    // @ManyToOne(() => Usuario, (usuario) => usuario.id)
    // usuario: Usuario;
    
}