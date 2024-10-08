import { Team } from 'src/modules/team/entities/team.entity';
import {
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BeforeUpdate,
  Entity,
  ManyToMany,
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

  @Column({ type: 'date', nullable: true, name: 'birth_date' })
  birthDate?: Date;

  @Column({ type: 'bool', default: true, name: 'is_active' })
  isActive: boolean;

  @ManyToMany(() => Team, (team) => team.players)
  teams: Team[];

  @BeforeInsert()
  @BeforeUpdate()
  format() {
    this.name = this.name.trim().toLocaleUpperCase();
    this.address = this.address?.trim().toLocaleUpperCase();
    this.email = this.email.trim();
  }
}
