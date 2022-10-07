import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Document } from '@/api/document/document.entity';

@Injectable()
export class DocumentRepository extends Repository<Document> {
  constructor(private dataSource: DataSource) {
    super(Document, dataSource.createEntityManager());
  }
}
