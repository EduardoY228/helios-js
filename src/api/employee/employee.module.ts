import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import { EmployeeController } from '@/api/employee/employee.controller';
import { EmployeeRepository } from '@/api/employee/employee.repository';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { PositionModule } from '@/api/position/position.module';
import { PlantModule } from '@/api/plant/plant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    NestjsFormDataModule,
    PositionModule,
    PlantModule,
  ],
  controllers: [EmployeeController],
  providers: [EmployeeService, EmployeeRepository],
})
export class EmployeeModule {}
