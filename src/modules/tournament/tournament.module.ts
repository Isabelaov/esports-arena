import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TournamentService } from './tournament.service';
import { TournamentController } from './tournament.controller';
import { Tournament } from './entities/tournament.entity';
import { Player } from '../player/entities/player.entity';
import { Team } from './entities/team.entity';
import { Result } from './entities/result.entity';
import { PlayerModule } from '../player/player.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Player, Tournament, Team, Result]),
    PlayerModule,
  ],
  controllers: [TournamentController],
  providers: [TournamentService],
})
export class TournamentModule {}
