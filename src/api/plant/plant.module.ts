import { Module } from '@nestjs/common';
import { PlantController } from './plant.controller';
import { PlantService } from './plant.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Plant } from './plant.entity';
import { PlantRepository } from '@/api/plant/plant.repository';
import { DocumentModule } from '@/api/document/document.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { UserModule } from '@/api/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plant]),
    DocumentModule,
    NestjsFormDataModule,
    UserModule,
  ],
  controllers: [PlantController],
  providers: [PlantService, PlantRepository],
  exports: [PlantService],
})
export class PlantModule {}
