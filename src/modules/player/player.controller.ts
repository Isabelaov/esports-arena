import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlayerService } from './player.service';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreatePlayer,
  DeletePlayer,
  FindOnePlayer,
  FindPlayers,
  UpdatePlayer,
} from './docs/player.doc';

@ApiTags('Users')
@Controller('player')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @CreatePlayer()
  @Post()
  create(@Body() createPlayerDto: CreatePlayerDto) {
    return this.playerService.create(createPlayerDto);
  }

  @FindPlayers()
  @Get()
  findAll() {
    return this.playerService.findAll();
  }

  @FindOnePlayer()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.playerService.findOne(id);
  }

  @UpdatePlayer()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlayerDto: UpdatePlayerDto) {
    return this.playerService.update(id, updatePlayerDto);
  }

  @DeletePlayer()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.playerService.remove(id);
  }
}
