import { DataSource, Repository } from 'typeorm';
import { Employee } from '@/api/employee/employee.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmployeeRepository extends Repository<Employee> {
  constructor(private dataSource: DataSource) {
    super(Employee, dataSource.createEntityManager());
  }

  public async findByPlantId(plantId: number) {
    return this.createQueryBuilder('employees')
      .innerJoin(
        (qb) => {
          return qb
            .select('*')
            .from(Employee, 'employees')
            .innerJoin('employees.plants', 'plants')
            .where('plants.id = :plantId', { plantId });
        },
        'plant_employee',
        'employees.id = "plant_employee".employee_id',
      )
      .leftJoinAndSelect('employees.plants', 'plants')
      .leftJoinAndSelect('employees.position', 'position')
      .getMany();
  }
}
