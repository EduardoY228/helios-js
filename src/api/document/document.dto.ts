import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumberString, IsOptional, IsString } from 'class-validator';
import { DocumentType } from '@/api/document/document-type.enum';
import { IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';

export class DocumentCreateRequestDto {
  @ApiProperty({ enum: DocumentType })
  @IsString()
  @IsEnum(DocumentType, {
    message: `document type must one of ${Object.values(DocumentType).join(
      ', ',
    )}`,
  })
  public readonly documentType: DocumentType;

  @IsFile()
  @MaxFileSize(20e6)
  public readonly file: MemoryStoredFile;

  @ApiProperty()
  @IsString()
  @IsOptional()
  public readonly name?: string;

  @ApiProperty()
  @IsNumberString()
  public readonly plantId: number;
}
