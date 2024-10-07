import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tournament } from './tournament.entity';
import { Player } from 'src/modules/player/entities/player.entity';
import { Result } from './result.entity';

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

  @OneToOne(() => Result, (result) => result.team)
  result: Result;

  @BeforeInsert()
  @BeforeUpdate()
  format() {
    this.name = this.name?.trim().toLocaleUpperCase();
  }
}
