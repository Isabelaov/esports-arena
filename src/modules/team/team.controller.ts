import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTeam,
  DeleteTeam,
  FindOneTeam,
  FindTeams,
  UpdateTeam,
} from './docs/team.docs';

@ApiTags('Tournaments')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @CreateTeam()
  @Post()
  create(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.create(createTeamDto);
  }

  @FindTeams()
  @Get()
  findAll() {
    return this.teamService.findAll();
  }

  @FindOneTeam()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @UpdateTeam()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(id, updateTeamDto);
  }

  @DeleteTeam()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
