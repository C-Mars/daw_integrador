import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { EstadosUsuarioEnum } from "../enums/estado-usuario.enum";
import { RolesEnum } from "../enums/roles.enum";


@Entity({name:'usuarios'})
export class Usuario{

    @PrimaryGeneratedColumn()
        id:number; 
    @Column({type:'varchar'})
        email:string;
    @Column({type:'varchar'})
        clave:string;
    @Column({type:'varchar'})
        apellidos:string;
    @Column({type:'varchar'})
        nombres:string;
    @Column({type:'varchar'})
        foto:string;
    @Column({type:'enum', enum:EstadosUsuarioEnum})
        estado:EstadosUsuarioEnum;
    @Column({type:'varchar'})
        nombreusuario:string;
    @Column({type:'enum', enum:RolesEnum})
        rol: RolesEnum;

    
}