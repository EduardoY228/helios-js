import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Headers,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Request,
  UseFilters,
  UseGuards,
} from '@nestjs/common';

import {
  UserCreateRequestDto,
  UserResponseDto,
  UserUpdateRequestDto,
} from './user.dto';
import { UserService } from './user.service';
import { FormDataRequest } from 'nestjs-form-data';
import { JwtAuthGuard } from '@/api/auth/jwt-auth.guard';
import { FileService } from '@/service/file.service';
import { AxiosExceptionFilter } from '@/exception/axios-exception.filter';
import { Role } from '@/types';
import { Roles } from '@/api/auth/roles.decorator';
import { RolesGuard } from '@/api/auth/roles.guard';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiExtraModels,
  ApiTags,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('/api/v1/users')
export class UserController {
  @Inject(UserService)
  private readonly service: UserService;
  @Inject(FileService)
  private readonly fileService: FileService;

  @ApiExtraModels(UserResponseDto)
  @ApiResponse({
    status: 201,
    schema: {
      $ref: getSchemaPath(UserResponseDto),
    },
  })
  @ApiConsumes('multipart/form-data')
  @Post()
  @Roles(Role.ADMIN)
  @FormDataRequest()
  @UseFilters(new AxiosExceptionFilter())
  private async create(
    @Body() userCreateDto: UserCreateRequestDto,
    @Headers('Authorization') token,
  ): Promise<UserResponseDto> {
    const userByEmail = await this.service.findByEmail(userCreateDto.email);

    if (userByEmail) {
      throw new BadRequestException('user by this email already exists');
    }

    return this.service.create(userCreateDto, token);
  }

  @Get('profile')
  profile(@Request() req) {
    return this.service.findByEmail(req.user.email);
  }

  @ApiExtraModels(UserResponseDto)
  @ApiResponse({
    isArray: true,
    status: 200,
    schema: {
      $ref: getSchemaPath(UserResponseDto),
    },
  })
  @Get()
  @Roles(Role.ADMIN)
  private getAll(): Promise<UserResponseDto[]> {
    return this.service.getAll();
  }

  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  @Roles(Role.ADMIN)
  @FormDataRequest()
  @UseFilters(new AxiosExceptionFilter())
  private async update(
    @Param() { id }: { id: number },
    @Body() update: UserUpdateRequestDto,
    @Headers('Authorization') token,
  ): Promise<UserResponseDto> {
    if (!(await this.service.isPresentById(id))) {
      throw new NotFoundException('user not found');
    }

    return this.service.update(id, update, token);
  }

  @ApiConsumes('multipart/form-data')
  @Patch('updateProfile/:id')
  @FormDataRequest()
  @UseFilters(new AxiosExceptionFilter())
  private async updateProfile(
    @Param() { id }: { id: number },
    @Body() update: UserUpdateRequestDto,
    @Headers('Authorization') token,
    @Req() req,
  ): Promise<UserResponseDto> {
    if (!(await this.service.isPresentById(id))) {
      throw new NotFoundException('user not found');
    }

    if (req.user.id !== id) {
      throw new ForbiddenException('cannot update not own profile');
    }

    return this.service.update(id, update, token);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  private async delete(@Param() params) {
    if (!(await this.service.isPresentById(params.id))) {
      throw new NotFoundException('user not found');
    }

    return this.service
      .deleteById(params.id)
      .then((count) => ({ deleteCount: count }));
  }
}
