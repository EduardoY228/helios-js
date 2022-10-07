import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Model_30817 } from '@/api/model-30817/model-30817.entity';

@Injectable()
export class Model30817Repository extends Repository<Model_30817> {
  constructor(private dataSource: DataSource) {
    super(Model_30817, dataSource.createEntityManager());
  }
}
