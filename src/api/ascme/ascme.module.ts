import { Module } from '@nestjs/common';
import { AscmeController } from '@/api/ascme/ascme.controller';
import { AscmeService } from '@/api/ascme/ascme.service';
import { Model30817Module } from '@/api/model-30817/model-30817.module';
import { Model30917Module } from '@/api/model-30917/model-30917.module';
import { Model30818Module } from '@/api/model-30818/model-30818.module';
import { PlantModule } from '@/api/plant/plant.module';

@Module({
  imports: [Model30817Module, Model30917Module, Model30818Module, PlantModule],
  controllers: [AscmeController],
  providers: [AscmeService],
})
export class AscmeModule {}
