import { Module } from '@nestjs/common';
import { ModelFileController } from './model-file.controller';
import { ModelFileService } from './model-file.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModelFile } from './model-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ModelFile])],
  controllers: [ModelFileController],
  providers: [ModelFileService],
})
export class ModelFileModule {}
