import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { Plant } from '../plant/plant.entity';

@Index('plant_id_index', ['plant'], { unique: true })
@Entity('calendar_event', { schema: 'public' })
export class CalendarEvent extends BaseEntity {
  @Column('boolean', { name: 'all_day', nullable: true })
  allDay: boolean | null;

  @Column('character varying', {
    name: 'calendar_event_type',
    nullable: true,
    length: 255,
  })
  calendarEventType: string | null;

  @Column('character varying', { name: 'color', nullable: true, length: 255 })
  color: string | null;

  @Column('character varying', {
    name: 'description',
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column('timestamp without time zone', { name: 'end_date', nullable: true })
  endDate: Date | null;

  @Column('timestamp without time zone', { name: 'start_date', nullable: true })
  startDate: Date | null;

  @Column('character varying', { name: 'title', nullable: true, length: 255 })
  title: string | null;

  @ManyToOne(() => Plant, (plant) => plant.calendarEvents, {
    onDelete: 'SET NULL',
    createForeignKeyConstraints: false,
  })
  @JoinColumn([{ name: 'plant_id', referencedColumnName: 'id' }])
  plant: Plant;
}
