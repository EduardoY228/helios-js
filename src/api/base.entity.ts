import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AutoMap } from '@automapper/classes';
import { Type } from 'class-transformer';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export interface BaseEntityType extends ObjectLiteral {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export class BaseEntity implements BaseEntityType {
  @AutoMap()
  @Type(() => Number)
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @AutoMap()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
