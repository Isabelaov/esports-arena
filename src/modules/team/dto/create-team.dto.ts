import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  ArrayNotEmpty,
  IsUUID,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  TrimString,
  StringToUppercase,
} from 'src/common/helpers/string-format.helper';

export class CreateTeamDto {
  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  playersIds: string[];

  @ApiPropertyOptional({ example: 'the gods' })
  @IsOptional()
  @IsString()
  @TrimString()
  @StringToUppercase()
  teamName?: string;

  @IsString()
  @TrimString()
  @IsUUID()
  tournamentId: string;
}
