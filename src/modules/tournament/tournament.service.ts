import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private tournamentRepository: Repository<Tournament>,
  ) {}

  create(createTournamentDto: CreateTournamentDto) {
    const {
      date,
      startTime,
      endTime,
      place,
      playersTeamOne,
      playersTeamTwo,
      nameTeamOne,
      nameTeamTwo,
    } = createTournamentDto;

    if (playersTeamOne.length !== playersTeamTwo.length)
      throw new BadRequestException('Teams must be of the same size');
    return 'This action adds a new tournament';
  }

  findAll() {
    return `This action returns all tournament`;
  }

  findOne(id: string) {
    return `This action returns a ${id} tournament`;
  }

  update(id: string, updateTournamentDto: UpdateTournamentDto) {
    return `This action updates a ${id} tournament`;
  }

  remove(id: string) {
    return `This action removes a ${id} tournament`;
  }
}
