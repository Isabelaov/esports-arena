import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Team } from './team.entity';

@Entity('tournaments')
export class Tournament {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'time' })
  startTime: string;

  @Column({ type: 'time' })
  endTime: string;

  @Column({ type: 'varchar' })
  place: string;

  @OneToMany(() => Team, (team) => team.tournament)
  teams: Team[];

  @BeforeInsert()
  @BeforeUpdate()
  formatPlace() {
    this.place = this.place.trim().toLocaleUpperCase();
  }
}
