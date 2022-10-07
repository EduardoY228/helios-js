import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Model_30818 } from '@/api/model-30818/model-30818.entity';

@Injectable()
export class Model30818Repository extends Repository<Model_30818> {
  constructor(private dataSource: DataSource) {
    super(Model_30818, dataSource.createEntityManager());
  }
}
