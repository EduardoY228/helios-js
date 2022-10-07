import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { DocumentService } from '@/api/document/document.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/api/auth/jwt-auth.guard';
import { RolesGuard } from '@/api/auth/roles.guard';
import { Roles } from '@/api/auth/roles.decorator';
import { Role } from '@/types';
import { FormDataRequest } from 'nestjs-form-data';
import { AxiosExceptionFilter } from '@/exception/axios-exception.filter';
import { DocumentCreateRequestDto } from '@/api/document/document.dto';
import { PlantService } from '@/api/plant/plant.service';

@ApiBearerAuth()
@ApiTags('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api/v1/documents')
@UseInterceptors(ClassSerializerInterceptor)
export class DocumentController {
  @Inject(DocumentService)
  private readonly documentService: DocumentService;
  @Inject(PlantService)
  private readonly plantService: PlantService;

  @Post()
  @Roles(Role.ADMIN)
  @FormDataRequest()
  @UseFilters(new AxiosExceptionFilter())
  private async create(
    @Body() documentCreateRequestDto: DocumentCreateRequestDto,
    @Headers('Authorization') token,
  ) {
    if (
      !(await this.plantService.isPresent(documentCreateRequestDto.plantId))
    ) {
      throw new BadRequestException("plant doesn't exists");
    }

    return this.documentService.create(documentCreateRequestDto, token);
  }

  @Get()
  @Roles(Role.ADMIN)
  private async getAll() {
    return this.documentService.getAll();
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  private async deleteById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Headers('Authorization') token,
  ) {
    if (!(await this.documentService.isPresent(id))) {
      throw new NotFoundException('document not found');
    }

    return this.documentService.deleteById(id, token);
  }
}
