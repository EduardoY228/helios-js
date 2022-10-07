import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Position } from '@/api/position/position.entity';

@Injectable()
export class PositionRepository extends Repository<Position> {
  constructor(private dataSource: DataSource) {
    super(Position, dataSource.createEntityManager());
  }
}
