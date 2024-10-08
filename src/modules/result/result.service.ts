import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Repository } from 'typeorm';
import { TeamService } from '../team/team.service';
import { Team } from '../team/entities/team.entity';

@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
    private readonly teamService: TeamService,
  ) {}

  async create(createResultDto: CreateResultDto) {
    const { teamId, score, teamWon } = createResultDto;

    const team: Team = await this.teamService.findOne(teamId);

    // TODO: Team validation

    const result = this.resultRepository.create({ team, score, teamWon });
    await this.resultRepository.save(result);
    return 'This action adds a new result';
  }

  async findAll(): Promise<Result[]> {
    const result: Result[] = await this.resultRepository.find({
      relations: ['team', 'team.players', 'team.tournament'],
    });

    if (!result) throw new NotFoundException('Results not found');

    return result;
  }

  async findOne(id: string) {
    const result: Result[] = await this.resultRepository.find({
      where: { id },
      relations: ['team', 'team.players', 'team.tournament'],
    });

    if (!result) throw new NotFoundException('Result not found');

    return result;
  }

  async update(id: string, updateResultDto: UpdateResultDto) {
    const { score, teamWon } = updateResultDto;
    await this.findOne(id);
    await this.resultRepository.update(id, { score, teamWon });
    return 'Result updated';
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.resultRepository.update(id, { isActive: false });
    return `Result set as inactive`;
  }
}
