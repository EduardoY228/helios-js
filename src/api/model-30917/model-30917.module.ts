import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model_30917 } from './model-30917.entity';
import { Model30917Repository } from '@/api/model-30917/model-30917.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Model_30917])],
  providers: [Model30917Repository],
  exports: [Model30917Repository],
})
export class Model30917Module {}
