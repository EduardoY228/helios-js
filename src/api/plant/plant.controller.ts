import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Headers,
  HttpStatus,
  Inject,
  Logger,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/api/auth/jwt-auth.guard';
import { RolesGuard } from '@/api/auth/roles.guard';
import { PlantService } from '@/api/plant/plant.service';
import { Roles } from '@/api/auth/roles.decorator';
import { Role } from '@/types';
import {
  PlantCreateRequestDto,
  PlantUpdateRequestDto,
} from '@/api/plant/plant.dto';
import { FormDataRequest } from 'nestjs-form-data';
import { AxiosExceptionFilter } from '@/exception/axios-exception.filter';
import { isNil } from 'lodash';
import { GetEntityPipe } from '@/api/plant/get-entity.pipe';

@ApiBearerAuth()
@ApiTags('plants')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/v1/plants')
@UseInterceptors(ClassSerializerInterceptor)
export class PlantController {
  @Inject(PlantService)
  private readonly plantService: PlantService;

  @Post()
  @Roles(Role.ADMIN)
  @FormDataRequest()
  @UseFilters(new AxiosExceptionFilter())
  private async create(
    @Body() plantCreateDto: PlantCreateRequestDto,
    @Headers('Authorization') token,
  ) {
    return this.plantService.create(plantCreateDto, token);
  }

  @UsePipes(new GetEntityPipe())
  @Get('/getById/:id')
  private async getById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    const plant = await this.plantService.findById(id);

    if (isNil(plant)) {
      throw new NotFoundException('plant not found');
    }

    return plant;
  }

  @Roles(Role.ADMIN)
  @Get()
  private async getAll() {
    return this.plantService.findAll();
  }

  @Get('getProfilePlants')
  private async getProfilePlants(@Request() req) {
    return this.plantService.findAllByUserId(req.user.id);
  }

  @Roles(Role.ADMIN)
  @Get('getUserPlants/:userId')
  private async getUserPlants(
    @Param(
      'userId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    userId: number,
  ) {
    return await this.plantService.findAllByUserId(userId);
  }

  @UsePipes()
  @Roles(Role.ADMIN)
  @Delete('/:id')
  private async deleteById(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    const plant = await this.plantService.findById(id);

    if (isNil(plant)) {
      throw new NotFoundException('plant not found');
    }

    return this.plantService.deleteById(plant.id);
  }

  @Patch('/:id')
  @Roles(Role.ADMIN)
  private async update(
    @Body() plantUpdateRequestDto: PlantUpdateRequestDto,
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    Logger.log('PlantController::update', {
      ...plantUpdateRequestDto,
    });

    if (!(await this.plantService.isPresent(id))) {
      throw new NotFoundException('plant not found');
    }

    return this.plantService.update(plantUpdateRequestDto, id);
  }
}
