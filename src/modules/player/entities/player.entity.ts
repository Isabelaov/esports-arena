import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  Entity,
} from 'typeorm';

@Entity('players')
export class Player {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: '200' })
  name: string;

  @Column({ type: 'varchar', length: '200' })
  email: string;

  @Column({ type: 'varchar', length: '200', select: false })
  password: string;

  @Column({ type: 'varchar', length: '200', nullable: true })
  address: string;

  @BeforeInsert()
  @BeforeUpdate()
  format() {
    this.name = this.name.trim().toLocaleUpperCase();
    this.address = this.address?.trim().toLocaleUpperCase();
    this.email = this.email.trim();
  }
}
