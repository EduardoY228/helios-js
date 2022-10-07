import { Module } from '@nestjs/common';
import { SourcePointController } from './source-point.controller';
import { SourcePointService } from './source-point.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SourcePoint } from './source-point.entity';
import { SourcePointRepository } from '@/api/source-point/source-point.repository';

@Module({
  imports: [TypeOrmModule.forFeature([SourcePoint])],
  controllers: [SourcePointController],
  providers: [SourcePointService, SourcePointRepository],
  exports: [SourcePointService],
})
export class SourcePointModule {}
