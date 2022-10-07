import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  IsFile,
  IsFiles,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { PlantStatus } from '@/api/plant/plant-status.enum';
import { Column, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CalendarEvent } from '@/api/calendar-event/calendar-event.entity';
import { Document } from '@/api/document/document.entity';
import { Employee } from '@/api/employee/employee.entity';
import { User } from '@/api/user/user.entity';
import { AutoMap } from '@automapper/classes';

export class PlantCreateRequestDto {
  @ApiProperty()
  @Type(() => Number)
  @IsPositive()
  public readonly acPower: number;

  @ApiProperty()
  @Type(() => Number)
  @IsPositive()
  public readonly dcPower: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty()
  @IsNumber({}, { each: true })
  public readonly pvsystGenerationPlan: number[];

  @ApiProperty()
  @Type(() => Number)
  @IsPositive()
  public readonly area: number;

  @ApiProperty()
  @IsNumberString()
  public readonly ascmePlantCode: string;

  @ApiProperty()
  @IsDateString()
  public readonly exploitationStart: Date;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public readonly name: string;

  @ApiProperty({ enum: PlantStatus })
  @IsString()
  @IsEnum(PlantStatus, {
    message: `status must one of ${Object.values(PlantStatus).join(', ')}`,
  })
  public readonly status: PlantStatus;

  @ApiProperty()
  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  @Min(-90)
  @Max(90)
  public readonly latitude: number;

  @ApiProperty()
  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  @Min(-180)
  @Max(180)
  public readonly longitude: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  public readonly employeesId: number[];

  @ApiProperty()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  public readonly userId: number;

  @IsOptional()
  @IsFiles()
  @MaxFileSize(10e6, { each: true })
  public readonly documents: MemoryStoredFile[];

  @IsOptional()
  @IsString({ each: true })
  public readonly documentTypes: string[];
}

export class PlantResponseDto {
  @ApiProperty({ minimum: 1 })
  @AutoMap()
  public readonly id: number;

  @AutoMap()
  public readonly acPower: number;

  @AutoMap()
  public readonly dcPower: number;

  @AutoMap()
  public readonly pvsystGenerationPlan: number[];

  @AutoMap()
  area: number;

  @AutoMap()
  ascmePlantCode: string;

  @AutoMap()
  exploitationStart: Date;

  @AutoMap()
  name: string;

  @AutoMap()
  status: PlantStatus;

  @AutoMap()
  calendarEvents: CalendarEvent[];

  @AutoMap()
  documents: Document[];

  @AutoMap()
  employees: Employee[];

  @AutoMap()
  location: { lat: number; lon: number };

  @AutoMap()
  userId: number;
}

export class PlantUpdateRequestDto {
  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  public readonly acPower?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  public readonly dcPower?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty()
  @IsNumber({}, { each: true })
  public readonly pvsystGenerationPlan?: number[];

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  public readonly area?: number;

  @ApiProperty()
  @IsOptional()
  @IsNumberString()
  public readonly ascmePlantCode?: string;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  public readonly exploitationStart?: Date;

  @ApiProperty()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public readonly name?: string;

  @ApiProperty({ enum: PlantStatus })
  @IsOptional()
  @IsString()
  @IsEnum(PlantStatus, {
    message: `status must one of ${Object.values(PlantStatus).join(', ')}`,
  })
  public readonly status?: PlantStatus;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  @Min(-90)
  @Max(90)
  public readonly latitude?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsPositive()
  @IsNumber()
  @Min(-180)
  @Max(180)
  public readonly longitude?: number;

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber({}, { each: true })
  public readonly employeesId?: number[];

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  public readonly userId?: number;
}
