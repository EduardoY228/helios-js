import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  HttpStatus,
  Inject,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/api/auth/jwt-auth.guard';
import { RolesGuard } from '@/api/auth/roles.guard';
import { Roles } from '@/api/auth/roles.decorator';
import { Role } from '@/types';
import { SourcePointRequestUpdateDto } from '@/api/source-point/source-point.dto';
import { SourcePointService } from '@/api/source-point/source-point.service';

@Roles(Role.ADMIN)
@ApiBearerAuth()
@ApiTags('source-points')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/v1/source-points')
@UseInterceptors(ClassSerializerInterceptor)
export class SourcePointController {
  @Inject(SourcePointService)
  private readonly sourcePointService: SourcePointService;

  @Post('batchUpdate')
  private async batchUpdate(
    @Body() sourcePointRequestUpdateDto: SourcePointRequestUpdateDto[],
  ) {
    return this.sourcePointService.batchUpdate(sourcePointRequestUpdateDto);
  }

  @Get()
  private async getAll() {
    return this.sourcePointService.findAll();
  }

  @Get('/getByCode')
  private async getByCode(
    @Query(
      'code',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    code: bigint,
  ) {
    return this.sourcePointService.findByCode(code);
  }
}
