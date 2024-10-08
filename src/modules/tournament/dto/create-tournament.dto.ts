import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  Matches,
  IsArray,
  ArrayNotEmpty,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { dateToGMT5 } from 'src/common/helpers/date-transformer.helper';
import {
  StringToUppercase,
  TrimString,
} from 'src/common/helpers/string-format.helper';

export class CreateTournamentDto {
  @ApiProperty({ example: '2024-10-20' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, {
    message: 'Date must be in YYYY-MM-DD format',
  })
  @Transform(({ value }) => dateToGMT5(value))
  date: Date;

  @ApiProperty({ example: '18:00' })
  @IsString()
  @TrimString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in HH:mm format (24h)',
  })
  startTime: string;

  @ApiProperty({ example: '20:00' })
  @IsString()
  @TrimString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
    message: 'Time must be in HH:mm format (24h)',
  })
  endTime: string;

  @ApiProperty({ example: 'My house' })
  @IsString()
  @TrimString()
  @StringToUppercase()
  place: string;

  //Optional fields for creating teams and results too

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  playersTeamOneIds: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @ApiProperty()
  @IsArray()
  @ArrayNotEmpty()
  @IsUUID('all', { each: true })
  playersTeamTwoIds: string[];

  @ApiPropertyOptional({ example: 'the gods' })
  @IsOptional()
  @IsString()
  @TrimString()
  @StringToUppercase()
  nameTeamOne?: string;

  @ApiPropertyOptional({ example: 'the gods' })
  @IsOptional()
  @IsString()
  @TrimString()
  @StringToUppercase()
  nameTeamTwo?: string;
}
