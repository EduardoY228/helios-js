import { Column, Entity, OneToMany } from 'typeorm';
import { Employee } from '../employee/employee.entity';
import { BaseEntity } from '../base.entity';

@Entity('positions')
export class Position extends BaseEntity {
  @Column('character varying', { name: 'name', nullable: true, length: 255 })
  name: string | null;

  @OneToMany(() => Employee, (employees) => employees.position)
  employees: Employee[];
}
