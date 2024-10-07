import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Matches } from 'class-validator';

export class CreatePlayerDto {
  @ApiProperty({ example: 'diego mar' })
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only letters and spaces',
  })
  name: string;

  @ApiProperty({ example: 'diego.mar@example.com' })
  @IsString()
  @IsEmail()
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
  address?: string;
}
