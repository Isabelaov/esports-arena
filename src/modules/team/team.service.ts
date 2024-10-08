import { Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Team } from './entities/team.entity';
import { TournamentService } from '../tournament/tournament.service';
import { Tournament } from '../tournament/entities/tournament.entity';

@Injectable()
export class TeamService {
  constructor(
    @InjectRepository(Team)
    private readonly teamRepository: Repository<Team>,
    private readonly tournamentService: TournamentService,
  ) {}
  async create(createTeamDto: CreateTeamDto) {
    const { playersIds, teamName, tournamentId } = createTeamDto;
    const tournament = await this.tournamentService.findOne(tournamentId);
    return 'This action adds a new team';
  }

  findAll() {
    return `This action returns all team`;
  }

  findOne(id: string) {
    return `This action returns a #${id} team`;
  }

  update(id: string, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  remove(id: string) {
    return `This action removes a #${id} team`;
  }
}
