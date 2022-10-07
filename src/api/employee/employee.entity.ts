import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';
import { Plant } from '../plant/plant.entity';
import { Position } from '../position/position.entity';
import { BaseEntity } from '../base.entity';
import { Expose, Transform } from 'class-transformer';

export type ScheduleScheme = {
  fiveDaySchedule: boolean;
  workStartTimestamp: string;
  vacationsDates?: string[];
  workHours?: number;
  restHours?: number;
};

@Entity('employees', { schema: 'public' })
export class Employee extends BaseEntity {
  @Column('character varying', {
    name: 'avatar_url',
    nullable: true,
    length: 255,
  })
  avatarUrl: string | null;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('text', { name: 'surname', nullable: true })
  surname: string | null;

  @Column('text', { name: 'phone', nullable: true })
  phone: string | null;

  @Column('jsonb', { name: 'schedule_scheme', nullable: true })
  scheduleScheme?: ScheduleScheme;

  @Expose({ name: 'plantIds' })
  @Transform(({ value }) => value?.map((p) => p.id))
  @ManyToMany(() => Plant, (plant) => plant.employees, {
    createForeignKeyConstraints: false,
  })
  plants: Plant[];

  @ManyToOne(() => Position, (position) => position.employees, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn([{ name: 'position_id', referencedColumnName: 'id' }])
  position: Position;
}
