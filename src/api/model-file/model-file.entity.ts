import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Index('name_index', ['name'], { unique: true })
@Entity('model_files', { schema: 'public' })
export class ModelFile extends BaseEntity {
  @Column('text', {
    name: 'name',
    nullable: true,
    unique: true,
  })
  name: string | null;
}
