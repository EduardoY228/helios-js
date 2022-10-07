import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import {
  HasMimeType,
  IsFile,
  MaxFileSize,
  MemoryStoredFile,
} from 'nestjs-form-data';
import { Role } from '@/types';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UserCreateRequestDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @IsFile()
  // 5 Mb = 5e6 bytes
  @MaxFileSize(5e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  public readonly avatar: MemoryStoredFile;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  public readonly name: string;

  @ApiProperty({ minLength: 8 })
  @IsString()
  @MinLength(8)
  public readonly password: string;

  @ApiProperty()
  @IsString()
  public readonly phone: string;

  @ApiProperty({ enum: Object.values(Role) })
  @IsString()
  @IsEnum(Role, { message: `role must be one of ${Object.values(Role)}` })
  public readonly role: Role;

  @ApiProperty()
  @IsEmail()
  public readonly email: string;
}

export class UserProfileUpdateRequestDto {
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsOptional()
  @IsFile()
  // 5 Mb = 5e6 bytes
  @MaxFileSize(5e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  public readonly avatar: MemoryStoredFile;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(2)
  public readonly name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(8)
  public readonly password: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  public readonly phone: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail()
  public readonly email: string;
}

export class UserUpdateRequestDto {
  @IsOptional()
  @IsString()
  @IsEnum(Role, { message: `role must be one of ${Object.values(Role)}` })
  public readonly role: Role;

  @IsOptional()
  @IsFile()
  // 5 Mb = 5e6 bytes
  @MaxFileSize(5e6)
  @HasMimeType(['image/jpeg', 'image/png'])
  public readonly avatar: MemoryStoredFile;

  @IsOptional()
  @IsString()
  @MinLength(2)
  public readonly name: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  public readonly password: string;

  @IsOptional()
  @IsString()
  public readonly phone: string;

  @IsOptional()
  @IsEmail()
  public readonly email: string;
}

export class UserResponseDto {
  @ApiProperty({ minimum: 1 })
  @AutoMap()
  public readonly id: number;

  @ApiProperty()
  @AutoMap()
  public readonly avatarUrl: string;

  @ApiProperty()
  @AutoMap()
  public readonly name: string;

  @ApiProperty()
  @AutoMap()
  public readonly password: string;

  @ApiProperty()
  @AutoMap()
  public readonly phone: string;

  @ApiProperty({ enum: Object.values(Role) })
  @AutoMap()
  public readonly role: Role;

  @ApiProperty()
  @AutoMap()
  public readonly email: string;

  @ApiProperty({ type: [Number] })
  @AutoMap()
  public readonly plants: number[];
}
