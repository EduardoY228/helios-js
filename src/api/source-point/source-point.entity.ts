import { Column, Entity, OneToMany } from 'typeorm';
import { Model_30917 } from '../model-30917/model-30917.entity';
import { BaseEntity } from '../base.entity';
import { Model_30817 } from '../model-30817/model-30817.entity';
import { Model_30818 } from '../model-30818/model-30818.entity';
import { Exclude } from 'class-transformer';

@Entity('source_points', { schema: 'public' })
export class SourcePoint extends BaseEntity {
  @Column('bigint', { name: 'source_point_code', nullable: true })
  sourcePointCode: bigint | null;

  @Column('character varying', {
    name: 'source_point_name',
    nullable: true,
    length: 255,
  })
  sourcePointName: string | null;

  @Column('double precision', {
    name: 'current_transformer_coefficient',
    nullable: true,
  })
  currentTransformerCoefficient: number | null;

  @Column('double precision', {
    name: 'voltage_transformer_coefficient',
    nullable: true,
  })
  voltageTransformerCoefficient: number | null;

  @Column('boolean', { name: 'is_commercial', nullable: true })
  isCommercial: boolean | null;

  @Exclude()
  @OneToMany(() => Model_30817, (model_30817) => model_30817.sourcePoint)
  row30817List: Model_30817[];

  @Exclude()
  @OneToMany(() => Model_30818, (model_30818) => model_30818.sourcePoint)
  row30818List: Model_30818[];

  @Exclude()
  @OneToMany(() => Model_30917, (model_30917) => model_30917.sourcePoint)
  row30917List: Model_30917[];
}
