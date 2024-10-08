import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResultService } from './result.service';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateResult,
  DeleteResult,
  FindOneResult,
  FindResults,
  UpdateResult,
} from './docs/result.doc';

@ApiTags('Results')
@Controller('result')
export class ResultController {
  constructor(private readonly resultService: ResultService) {}

  @CreateResult()
  @Post()
  create(@Body() createResultDto: CreateResultDto) {
    return this.resultService.create(createResultDto);
  }

  @FindResults()
  @Get()
  findAll() {
    return this.resultService.findAll();
  }

  @FindOneResult()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resultService.findOne(id);
  }

  @UpdateResult()
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResultDto: UpdateResultDto) {
    return this.resultService.update(id, updateResultDto);
  }

  @DeleteResult()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resultService.remove(id);
  }
}
