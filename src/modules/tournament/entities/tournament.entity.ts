import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from '../../team/entities/team.entity';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time', name: 'start_time' })
  startTime: string;

  @Column({ type: 'time', name: 'end_time' })
  endTime: string;

  @Column({ type: 'varchar' })
  place: string;

  @OneToMany(() => Team, (team) => team.tournament)
  teams: Team[];

  @Column({ type: 'bool', default: true, name: 'is_active' })
  isActive: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  formatPlace() {
    this.place = this.place.trim().toLocaleUpperCase();
  }
}
