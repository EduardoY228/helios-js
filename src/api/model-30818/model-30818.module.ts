import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model_30818 } from './model-30818.entity';
import { Model30818Repository } from '@/api/model-30818/model-30818.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Model_30818])],
  controllers: [],
  providers: [Model30818Repository],
  exports: [Model30818Repository],
})
export class Model30818Module {}
