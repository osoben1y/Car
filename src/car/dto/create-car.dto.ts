import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNumber, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCarDto {
  @ApiProperty({ example: 'Tesla Model S', minLength: 2 })
  @IsString()
  @MinLength(2)
  name: string;

  @ApiProperty({ example: 75000 })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiProperty({ example: 'Tesla' })
  @IsString()
  brand: string;

  @ApiProperty({ example: 'Red' })
  @IsString()
  color: string;

  @ApiProperty({ example: '2024-01-01' })
  @IsDateString()
  releaseDate: string;

  @ApiProperty({ example: 670 })
  @Type(() => Number)
  @IsNumber()
  power: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: string;
}
