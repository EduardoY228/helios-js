import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { Type } from 'class-transformer';
import { ParseOptionalBoolean } from '@/utils';

export class EmployeeCreateRequestDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @IsFile()
  @MaxFileSize(5e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  public readonly avatar?: MemoryStoredFile;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  public readonly name: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  public readonly surname: string;

  @ApiProperty()
  @IsPhoneNumber()
  public readonly phone: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @ParseOptionalBoolean()
  public readonly fiveDaySchedule?: boolean;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  public readonly workStartTimestamp?: string;

  @ApiProperty({ isArray: true })
  @IsDateString({}, { each: true })
  @IsOptional()
  public readonly vacationsDates?: string[];

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public readonly workHours?: number;

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public readonly restHours?: number;

  @ApiProperty({ isArray: true })
  @IsNumber({}, { each: true })
  @Type(() => Number)
  public readonly plantIds: number[];

  @ApiProperty()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  public readonly positionId: number;
}

export class EmployeeUpdateRequestDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @IsFile()
  @MaxFileSize(5e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  public readonly avatar?: MemoryStoredFile;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  @ParseOptionalBoolean()
  public readonly deleteAvatar?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2)
  public readonly name?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @MinLength(2)
  public readonly surname?: string;

  @ApiProperty()
  @IsOptional()
  @IsPhoneNumber()
  public readonly phone?: string;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  @ParseOptionalBoolean()
  public readonly fiveDaySchedule?: boolean;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  public readonly workStartTimestamp?: string;

  @ApiProperty({ isArray: true })
  @IsDateString({}, { each: true })
  @IsOptional()
  public readonly vacationsDates?: string[];

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public readonly workHours?: number;

  @ApiProperty()
  @IsPositive()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public readonly restHours?: number;

  @ApiProperty({ isArray: true })
  @IsOptional()
  @IsNumber({}, { each: true })
  @Type(() => Number)
  public readonly plantIds?: number[];

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  @IsPositive()
  @Type(() => Number)
  public readonly positionId?: number;
}
