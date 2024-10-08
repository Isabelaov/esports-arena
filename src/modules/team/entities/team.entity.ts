import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tournament } from '../../tournament/entities/tournament.entity';
import { Player } from 'src/modules/player/entities/player.entity';
import { Result } from '../../result/entities/result.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Tournament)
  tournament: Tournament;

  @ManyToMany(() => Player, (player) => player.teams)
  @JoinTable({ name: 'teams_players' })
  players: Player[];

  @Column({ type: 'varchar', nullable: true })
  name?: string;

  @OneToOne(() => Result, (result) => result.team, { nullable: true })
  @JoinColumn()
  result: Result;

  @BeforeInsert()
  @BeforeUpdate()
  format() {
    this.name = this.name?.trim().toLocaleUpperCase();
  }
}
