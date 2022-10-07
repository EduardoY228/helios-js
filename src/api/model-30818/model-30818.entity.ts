import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { SourcePoint } from '../source-point/source-point.entity';

@Entity('model_30818')
export class Model_30818 extends BaseEntity {
  @Column('bigint', { name: 'company_code', nullable: true })
  companyCode: string | null;

  @Column('date', { name: 'date', nullable: true })
  date: Date | null;

  @Column('double precision', { name: 'sum', nullable: true })
  sum: number | null;

  @Column('character varying', { name: 'channel', nullable: true, length: 255 })
  channel: string | null;

  @Column('double precision', {
    name: 'tariff_1',
    nullable: true,
  })
  tariff_1: number | null;

  @Column('double precision', {
    name: 'tariff_2',
    nullable: true,
  })
  tariff_2: number | null;

  @Column('double precision', {
    name: 'tariff_3',
    nullable: true,
  })
  tariff_3: number | null;

  @ManyToOne(() => SourcePoint, (sourcePoints) => sourcePoints.row30818List)
  @JoinColumn([{ name: 'source_point_id', referencedColumnName: 'id' }])
  sourcePoint: SourcePoint;
}
