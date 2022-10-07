import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../base.entity';
import { SourcePoint } from '../source-point/source-point.entity';

@Index('model_30817_date_index', ['date', 'id'], {})
@Entity('model_30817')
export class Model_30817 extends BaseEntity {
  @Column('bigint', { name: 'company_code', nullable: true })
  companyCode: string | null;

  @Column('date', { name: 'date', nullable: true })
  date: Date | null;

  @Column('double precision', { name: 'sum', nullable: true })
  sum: number | null;

  @Column('float8', { name: 'kvt_per_hour', nullable: true, array: true })
  kvtPerHour: number[] | null;

  @ManyToOne(() => SourcePoint, (sourcePoints) => sourcePoints.row30817List, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn([{ name: 'source_point_id', referencedColumnName: 'id' }])
  sourcePoint: SourcePoint;
}
