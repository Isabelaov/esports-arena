import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tournament } from './entities/tournament.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TournamentService {
  constructor(
    @InjectRepository(Tournament)
    private readonly tournamentRepository: Repository<Tournament>,
  ) {}

  async create(createTournamentDto: CreateTournamentDto) {
    const { date, startTime, endTime, place } = createTournamentDto;
    await this.checkPlaceDate(date, place);

    const tournament = this.tournamentRepository.create({
      date,
      startTime,
      endTime,
      place,
    });

    await this.tournamentRepository.save(tournament);

    return 'Tournament created successfully';
  }

  async checkPlaceDate(date: Date, place: string) {
    //The date in the database is stored as a "string"
    const existingTournament = await this.tournamentRepository.findOneBy({
      date,
      place,
    });

    if (existingTournament)
      throw new BadRequestException('Date and place unavailable');
  }

  async findAll(): Promise<Tournament[]> {
    const result: Tournament[] = await this.tournamentRepository.find({
      relations: ['teams', 'teams.players', 'teams.result'],
    });

    if (!result) throw new NotFoundException('Tournaments not found');

    return result;
  }

  async findOne(id: string): Promise<Tournament[]> {
    const result: Tournament[] = await this.tournamentRepository.find({
      where: { id },
      relations: ['teams', 'teams.players', 'teams.result'],
    });

    if (!result) throw new NotFoundException('Tournament not found');

    return result;
  }

  async update(
    id: string,
    updateTournamentDto: UpdateTournamentDto,
  ): Promise<string> {
    await this.findOne(id);
    await this.tournamentRepository.update(id, updateTournamentDto);

    return 'Tournament updated successfully';
  }

  async remove(id: string): Promise<string> {
    await this.findOne(id);
    await this.tournamentRepository.update(id, { isActive: false });
    return 'Tournament set as inactive';
  }
}
