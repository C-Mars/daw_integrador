import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EstadosUsuarioEnum } from "../../auth/enums/estado-usuario.enum";
import { RolesEnum } from "../../auth/enums/roles.enum";
import { Exclude, Expose } from 'class-transformer';


@Entity({name:'usuarios'})
export class Usuario{

    @PrimaryGeneratedColumn()
        id:number; 
        
    @Column({type:'varchar'})
        nombres:string;
    
    @Column({type:'varchar'})
        apellidos:string;
    
    @Exclude()    
    @Column({type:'varchar'})
        clave:string;
    
    @Column({type:'varchar'})
        foto:string;
    
    @Column({type:'enum', enum:EstadosUsuarioEnum})
        estado:EstadosUsuarioEnum;

    @Column({type:'varchar'})
        email:string;

    @Exclude()    
    @Column({type:'varchar'})
        nombreUsuario:string;
    
    @Column({type:'enum', enum:RolesEnum})
        rol: RolesEnum;

    @Expose()
    get nombreCompleto(): string {
        return this.apellidos + ', ' + this.nombres;
    }

    @OneToMany(()=>Actividades),(actividades) =>avtividades.usuario
}