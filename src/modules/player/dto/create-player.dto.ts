import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';
import { dateToGMT5 } from 'src/common/helpers/date-transformer.helper';
import {
  StringToUppercase,
  TrimString,
} from 'src/common/helpers/string-format.helper';

export class CreatePlayerDto {
  @ApiProperty({ example: 'diego mar' })
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only letters and spaces',
  })
  @TrimString()
  @StringToUppercase()
  name: string;

  @ApiProperty({ example: 'diego.mar@example.com' })
  @IsString()
  @IsEmail()
  @TrimString()
  email: string;

  @ApiProperty({ example: 'Password!123' })
  @IsString()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.*])[A-Za-z\d@$!%*?&.*]{8,}$/,
    { message: 'Password is too weak' },
  )
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @TrimString()
  @StringToUppercase()
  address?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @Matches(/^\d{4}-\d{2}-\d{2}$/)
  @Transform(({ value }) => dateToGMT5(value))
  birthDate?: Date;
}
