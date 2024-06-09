import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'clientes' })
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nombres: string;

  @Column({ type: 'varchar' })
  apellidos: string;

  @Column({ type: 'varchar' })
  email: string;
}
