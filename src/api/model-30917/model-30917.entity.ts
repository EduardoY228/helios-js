import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { SourcePoint } from '../source-point/source-point.entity';
import { BaseEntity } from '../base.entity';
import { Model30917Channel } from '@/api/model-30917/model-30917-channel.enum';

@Entity('model_30917', { schema: 'public' })
export class Model_30917 extends BaseEntity {
  @Column('bigint', { name: 'company_code', nullable: true })
  companyCode: string | null;

  @Column('date', { name: 'date', nullable: true })
  date: Date | null;

  @Column('double precision', { name: 'sum', nullable: true })
  sum: number | null;

  @Column('character varying', { name: 'channel', nullable: true, length: 255 })
  channel: Model30917Channel | null;

  @Column('float8', { name: 'kvt_per_half_hour', nullable: true, array: true })
  kvtPerHalfHour: number[] | null;

  @ManyToOne(() => SourcePoint, (sourcePoint) => sourcePoint.row30917List, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn([{ name: 'source_point_id', referencedColumnName: 'id' }])
  sourcePoint: SourcePoint;
}
