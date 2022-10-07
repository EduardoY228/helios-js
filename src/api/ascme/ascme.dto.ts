import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { Model30917Channel } from '@/api/model-30917/model-30917-channel.enum';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class DaySumByChannelRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  public readonly plantId: number;

  @ApiProperty({
    isArray: true,
    enum: Model30917Channel,
  })
  @ArrayMaxSize(4)
  @ArrayMinSize(1)
  @IsEnum(Model30917Channel, {
    each: true,
    message: `channels value must contain one of ${Object.values(
      Model30917Channel,
    ).join(', ')}`,
  })
  public readonly channels: Model30917Channel[];

  @ApiProperty()
  @IsDateString()
  public readonly day: string;

  @ApiProperty({
    isArray: true,
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  public readonly excludeSourcePoints?: number[];
}

export class DaysSumByChannelRequestDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  public readonly plantId: number;

  @ApiProperty({
    isArray: true,
    enum: Model30917Channel,
  })
  @ArrayMaxSize(4)
  @ArrayMinSize(1)
  @IsEnum(Model30917Channel, {
    each: true,
    message: `channels value must contain one of ${Object.values(
      Model30917Channel,
    ).join(', ')}`,
  })
  public readonly channels: Model30917Channel[];

  @ApiProperty()
  @IsDateString()
  public readonly dayStart: string;

  @ApiProperty()
  @IsDateString()
  public readonly dayEnd: string;

  @ApiProperty({
    isArray: true,
  })
  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  public readonly excludeSourcePoints?: number[];
}
