import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Team } from './team.entity';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => Team, (team) => team.result)
  team: Team;

  @Column({ type: 'float', default: 0 })
  score: number;
}
