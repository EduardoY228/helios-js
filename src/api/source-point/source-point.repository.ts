import { Injectable, Logger } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { SourcePoint } from '@/api/source-point/source-point.entity';
import { SourcePointRequestUpdateDto } from '@/api/source-point/source-point.dto';

@Injectable()
export class SourcePointRepository extends Repository<SourcePoint> {
  constructor(private dataSource: DataSource) {
    super(SourcePoint, dataSource.createEntityManager());
  }

  public async batchUpdate(payload: SourcePointRequestUpdateDto[]) {
    return Promise.all(payload.map((sp) => this.updateById(sp)));
  }

  public async updateById({
    id,
    ...restPayload
  }: SourcePointRequestUpdateDto): Promise<SourcePoint> {
    return this.createQueryBuilder()
      .update(restPayload)
      .where({ id })
      .returning('*')
      .execute()
      .then((res) => res.raw[0]);
  }

  public async findByCode(code: bigint) {
    return this.findOne({
      where: {
        sourcePointCode: code,
      },
    });
  }
}
