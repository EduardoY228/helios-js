import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base.entity';

@Entity('pages', { schema: 'public' })
export class Page extends BaseEntity {
  @Column('text', { name: 'content', nullable: true })
  content: string | null;

  @Column('text', { name: 'title', nullable: true })
  title: string | null;
}
