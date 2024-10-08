import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUUID,
} from 'class-validator';

export class CreateResultDto {
  @ApiProperty()
  @IsUUID()
  teamId: string;

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  score: number;

  @ApiPropertyOptional()
  @IsOptional()
  @IsBoolean()
  teamWon?: boolean;
}
