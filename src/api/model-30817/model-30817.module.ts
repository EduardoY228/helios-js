import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model_30817 } from './model-30817.entity';
import { Model30817Repository } from '@/api/model-30817/model-30817.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Model_30817])],
  providers: [Model30817Repository],
  exports: [Model30817Repository],
})
export class Model30817Module {}
