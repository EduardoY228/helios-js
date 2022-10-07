import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Plant } from '../plant/plant.entity';
import { BaseEntity } from '../base.entity';
import { Expose, Transform } from 'class-transformer';

@Entity('documents', { schema: 'public' })
export class Document extends BaseEntity {
  @Column('character varying', {
    name: 'document_type',
    nullable: true,
    length: 255,
  })
  documentType: string | null;

  @Column('text', { name: 'name', nullable: true })
  name: string | null;

  @Column('text', { name: 'url', nullable: true })
  url: string | null;

  @Expose({ name: 'plantId' })
  @Transform(({ value }) => value?.id)
  @ManyToOne(() => Plant, (plant) => plant.documents, {
    createForeignKeyConstraints: false,
  })
  @JoinColumn([{ name: 'plant_id', referencedColumnName: 'id' }])
  plant: Plant;
}
