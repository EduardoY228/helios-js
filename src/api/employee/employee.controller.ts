import {
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
  Patch,
  Post,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EmployeeService } from '@/api/employee/employee.service';
import { FormDataRequest } from 'nestjs-form-data';
import { AxiosExceptionFilter } from '@/exception/axios-exception.filter';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/api/auth/jwt-auth.guard';
import { RolesGuard } from '@/api/auth/roles.guard';
import {
  EmployeeCreateRequestDto,
  EmployeeUpdateRequestDto,
} from '@/api/employee/employee.dto';
import { Roles } from '@/api/auth/roles.decorator';
import { Role } from '@/types';

@ApiBearerAuth()
@ApiTags('employees')
@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('api/v1/employees')
export class EmployeeController {
  @Inject(EmployeeService)
  private readonly employeeService: EmployeeService;

  @Post()
  @FormDataRequest()
  @UseFilters(new AxiosExceptionFilter())
  public create(
    @Body() employeeCreateRequestDto: EmployeeCreateRequestDto,
    @Headers('Authorization') token,
  ) {
    return this.employeeService.create(employeeCreateRequestDto, token);
  }

  @Get()
  public findAll() {
    return this.employeeService.findAll();
  }

  @Get(':id')
  public findOne(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.employeeService.findOne(id);
  }

  @Get('/getByPlant/:id')
  public findByPlantId(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.employeeService.findByPlantId(id);
  }

  @FormDataRequest()
  @UseFilters(new AxiosExceptionFilter())
  @Patch(':id')
  public async update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() employeeUpdateRequestDto: EmployeeUpdateRequestDto,
    @Headers('Authorization') token,
  ) {
    if (!(await this.employeeService.isPresent(id))) {
      throw new NotFoundException('employee not found');
    }

    return this.employeeService.update(id, employeeUpdateRequestDto, token);
  }

  @Delete(':id')
  public async remove(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    if (!(await this.employeeService.isPresent(id))) {
      throw new NotFoundException('employee not found');
    }

    return this.employeeService.remove(id);
  }
}
