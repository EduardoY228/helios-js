import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SourcePointRequestUpdateDto {
  @ApiProperty()
  @IsNumber()
  @IsPositive()
  public readonly id: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  public readonly sourcePointName?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public readonly currentTransformerCoefficient?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  public readonly voltageTransformerCoefficient?: number;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  public readonly isCommercial?: boolean;
}
