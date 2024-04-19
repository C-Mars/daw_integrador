import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


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
    @Column({type:'int'})
        estado:number;
    @Column({type:'varchar'})
        nombreusuario:string;
    @Column({type:'int'})
        rol:number;

    
}