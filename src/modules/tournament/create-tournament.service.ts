import { Injectable, BadRequestException } from '@nestjs/common';
import { ITeamsResponse } from 'src/common/types/teams-response';
import { DataSource, QueryRunner } from 'typeorm';
import { Player } from '../player/entities/player.entity';
import { Result } from '../result/entities/result.entity';
import { Team } from '../team/entities/team.entity';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { Tournament } from './entities/tournament.entity';
import { PlayerService } from '../player/player.service';

@Injectable()
export class CreateTournamentService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly playerService: PlayerService,
  ) {}

  async create(createTournamentDto: CreateTournamentDto) {
    const {
      date,
      startTime,
      endTime,
      place,
      playersTeamOneIds,
      playersTeamTwoIds,
      nameTeamOne,
      nameTeamTwo,
    } = createTournamentDto;

    const { playersTeamOne, playersTeamTwo } = await this.validateTeams(
      playersTeamOneIds,
      playersTeamTwoIds,
    );

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const tournament: Tournament = queryRunner.manager.create(Tournament, {
        date,
        startTime,
        endTime,
        place,
      });
      await queryRunner.manager.save(tournament);

      const teamOne: Team = await this.createTeam(
        playersTeamOne,
        tournament,
        queryRunner,
        nameTeamOne,
      );

      await this.createResult(teamOne, queryRunner);

      const teamTwo: Team = await this.createTeam(
        playersTeamTwo,
        tournament,
        queryRunner,
        nameTeamTwo,
      );

      await this.createResult(teamTwo, queryRunner);

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }

    return 'Tournament created successfully';
  }

  private async createResult(
    team: Team,
    queryRunner: QueryRunner,
  ): Promise<Result> {
    const result: Result = queryRunner.manager.create(Result, { team });

    // error when saving result into database

    return await queryRunner.manager.save(result);
  }

  private async createTeam(
    players: Player[],
    tournament: Tournament,
    queryRunner: QueryRunner,
    name?: string,
  ): Promise<Team> {
    const team: Team = queryRunner.manager.create(Team, {
      players,
      name,
      tournament,
    });
    return await queryRunner.manager.save(team);
  }

  private async validateTeams(
    team1: string[],
    team2: string[],
  ): Promise<ITeamsResponse> {
    if (
      this.areElementsEqual(team1) &&
      this.areElementsEqual(team2) &&
      this.areArraysEqual(team1, team2)
    )
      throw new BadRequestException('Players are repeated');

    const teamOne: Player[] = await this.playerService.findByIds(team1);

    const teamTwo: Player[] = await this.playerService.findByIds(team2);

    if (teamOne.length !== teamTwo.length)
      throw new BadRequestException('Teams must be of the same size');

    return { playersTeamOne: teamOne, playersTeamTwo: teamTwo };
  }

  private areArraysEqual(arr1: any[], arr2: any[]): boolean {
    return arr1.some((item) => arr2.includes(item));
  }

  private areElementsEqual(arr: any[]): boolean {
    const unique = new Set(arr);
    return unique.size !== arr.length;
  }
}
