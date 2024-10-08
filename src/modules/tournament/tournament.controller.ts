import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TournamentService } from './tournament.service';
import { CreateTournamentDto } from './dto/create-tournament.dto';
import { UpdateTournamentDto } from './dto/update-tournament.dto';
import {
  CreateTournament,
  DeleteTournament,
  FindOneTournament,
  FindTournaments,
  UpdateTournament,
} from './docs/tournament.doc';

@ApiTags('Tournaments')
@Controller('tournament')
export class TournamentController {
  constructor(private readonly tournamentService: TournamentService) {}

  @CreateTournament()
  @Post()
  create(@Body() createTournamentDto: CreateTournamentDto) {
    return this.tournamentService.create(createTournamentDto);
  }

  @FindTournaments()
  @Get()
  findAll() {
    return this.tournamentService.findAll();
  }

  @FindOneTournament()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tournamentService.findOne(id);
  }

  @UpdateTournament()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTournamentDto: UpdateTournamentDto,
  ) {
    return this.tournamentService.update(id, updateTournamentDto);
  }

  @DeleteTournament()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tournamentService.remove(id);
  }
}
