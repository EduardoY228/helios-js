import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CalendarEvent } from '../calendar-event/calendar-event.entity';
import { Document } from '../document/document.entity';
import { Employee } from '../employee/employee.entity';
import { User } from '../user/user.entity';
import { BaseEntity } from '../base.entity';
import { Expose, Transform } from 'class-transformer';
import { PlantStatus } from '@/api/plant/plant-status.enum';

@Index('plant_user_id_name_index', ['user', 'name'], { unique: true })
@Entity('plants')
export class Plant extends BaseEntity {
  @Column('integer', { name: 'ac_power', nullable: true })
  acPower: number | null;

  @Column('integer', { name: 'dc_power', nullable: true })
  dcPower: number | null;

  @Column('float8', {
    name: 'pvsyst_generation_plan',
    nullable: true,
    array: true,
  })
  pvsystGenerationPlan: number[] | null;

  @Column('double precision', { name: 'area', nullable: true })
  area: number | null;

  @Column('bigint', { name: 'ascme_plant_code', nullable: true })
  ascmePlantCode: string | null;

  @Column('timestamp without time zone', {
    name: 'exploitation_start',
    nullable: true,
  })
  exploitationStart: Date | null;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('text', { name: 'status', nullable: true })
  status: PlantStatus | null;

  @Column('jsonb', { nullable: true, name: 'status_schedule' })
  statusSchedule: Record<string, PlantStatus>;

  @OneToMany(() => CalendarEvent, (calendarEvent) => calendarEvent.plant, {
    createForeignKeyConstraints: false,
  })
  calendarEvents: CalendarEvent[];

  @OneToMany(() => Document, (document) => document.plant, {
    onDelete: 'SET NULL',
    onUpdate: 'SET NULL',
    createForeignKeyConstraints: false,
  })
  documents: Document[];

  @Expose({ name: 'employeeIds' })
  @Transform(({ value }) => value?.map((e) => e?.id))
  @ManyToMany(() => Employee, (employee) => employee.plants, {
    createForeignKeyConstraints: false,
    cascade: true,
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinTable({
    name: 'plant_employee',
    joinColumn: { name: 'plant_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'employee_id', referencedColumnName: 'id' },
  })
  employees: Employee[];

  @Column('jsonb', { nullable: true })
  location?: { lat: number; lon: number };

  @Expose({ name: 'userId' })
  @Transform(({ value }) => value?.id)
  @ManyToOne(() => User, (user) => user.plants, {
    onDelete: 'SET NULL',
    createForeignKeyConstraints: false,
  })
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  user: User;
}
