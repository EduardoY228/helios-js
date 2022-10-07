import { forwardRef, Module } from '@nestjs/common';
import { DocumentController } from './document.controller';
import { DocumentService } from './document.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { DocumentRepository } from '@/api/document/document.repository';
import { ServiceModule } from '@/service/service.module';
import { NestjsFormDataModule } from 'nestjs-form-data';
import { PlantModule } from '@/api/plant/plant.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Document]),
    ServiceModule,
    NestjsFormDataModule,
    forwardRef(() => PlantModule),
  ],
  controllers: [DocumentController],
  providers: [DocumentService, DocumentRepository],
  exports: [DocumentService],
})
export class DocumentModule {}
