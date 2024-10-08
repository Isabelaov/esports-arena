import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TournamentService } from '../tournament/tournament.service';
import { Tournament } from '../tournament/entities/tournament.entity';
import { PlayerService } from '../player/player.service';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly tournamentService: TournamentService,
    private readonly playerService: PlayerService,
  ) {}

  async create(createTeamDto: CreateTeamDto) {
    const { playersIds, teamName, tournamentId } = createTeamDto;
    const tournament: Tournament =
      await this.tournamentService.findOne(tournamentId);

    if (!tournament) throw new NotFoundException('Tournament not found');

    const players = await this.playerService.findByIds(playersIds);

    // TODO: validate players

    const team = this.teamRepository.create({
      name: teamName,
      players,
      tournament,
    });
    await this.teamRepository.save(team);

    return 'Team created successfully';
  }

  async findAll(): Promise<Team[]> {
    const result: Team[] = await this.teamRepository.find({
      relations: ['tournament', 'players', 'result'],
    });

    if (!result) throw new NotFoundException('Teams not found');

    return result;
  }

  async findOne(id: string): Promise<Team> {
    const result: Team = await this.teamRepository.findOne({
      where: { id },
      relations: ['tournament', 'players', 'result'],
    });

    if (!result) throw new NotFoundException('Team not found');

    return result;
  }

  async update(id: string, updateTeamDto: UpdateTeamDto): Promise<string> {
    const data = { name: updateTeamDto.teamName, ...updateTeamDto };
    await this.findOne(id);
    await this.teamRepository.update(id, { ...data });
    return 'Team updated successfully';
  }

  async remove(id: string) {
    const team: Team = await this.findOne(id);

    if (team.result) throw new BadRequestException('Cannot delete team');

    await this.teamRepository.delete(id);
    return 'Team deleted successfully';
  }
}
