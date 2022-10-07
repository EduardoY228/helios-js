import { DataSource, Repository } from 'typeorm';
import { Model_30917 } from '@/api/model-30917/model-30917.entity';
import { Injectable } from '@nestjs/common';
import { Model30917Channel } from '@/api/model-30917/model-30917-channel.enum';
import { SourcePoint } from '@/api/source-point/source-point.entity';
import { Plant } from '../plant/plant.entity';
import { isEmpty } from 'lodash';

@Injectable()
export class Model30917Repository extends Repository<Model_30917> {
  constructor(private dataSource: DataSource) {
    super(Model_30917, dataSource.createEntityManager());
  }

  public async getDaySumByChannel(
    plantId: number,
    channels: Model30917Channel[],
    day: string,
    excludeSourcePoints?: number[],
  ) {
    const queryBuilder = this.createQueryBuilder('m')
      .select('m.channel')
      .addSelect('sum(m.sum)')
      .innerJoin(SourcePoint, 'sp', 'm.source_point_id = sp.id')
      .innerJoin(Plant, 'p', 'p.ascme_plant_code = m.company_code')
      .where('p.id = :plantId', { plantId })
      .andWhere('m.channel IN (:...channels)', { channels })
      .andWhere('date = :day', { day });

    if (!isEmpty(excludeSourcePoints)) {
      queryBuilder.andWhere(
        'sp.source_point_code NOT IN (:...excludeSourcePoints)',
        { excludeSourcePoints },
      );
    }

    return queryBuilder
      .andWhere('sp.is_commercial')
      .groupBy('m.channel')
      .getRawMany();
  }

  public async getDaysSumByChannel(
    plantId: number,
    channels: Model30917Channel[],
    startDay: string,
    endDay: string,
    excludeSourcePoints?: number[],
  ) {
    const queryBuilder = this.createQueryBuilder('m')
      .select('m.channel')
      .addSelect('sum(m.sum)')
      .innerJoin(SourcePoint, 'sp', 'm.source_point_id = sp.id')
      .innerJoin(Plant, 'p', 'p.ascme_plant_code = m.company_code')
      .where('p.id = :plantId', { plantId })
      .andWhere('m.channel IN (:...channels)', { channels })
      .andWhere('date between :startDay and :endDay', { startDay, endDay });

    if (!isEmpty(excludeSourcePoints)) {
      queryBuilder.andWhere(
        'sp.source_point_code NOT IN (:...excludeSourcePoints)',
        { excludeSourcePoints },
      );
    }

    return queryBuilder
      .andWhere('sp.is_commercial')
      .groupBy('m.channel')
      .getRawMany();
  }

  public async getDayKvtPerHalfHourByChannel(
    plantId: number,
    channels: Model30917Channel[],
    day: string,
    excludeSourcePoints?: number[],
  ) {
    const queryBuilder = this.createQueryBuilder('m')
      .select('m.channel')
      .addSelect('m.kvt_per_half_hour')
      .innerJoin(SourcePoint, 'sp', 'm.source_point_id = sp.id')
      .innerJoin(Plant, 'p', 'p.ascme_plant_code = m.company_code')
      .where('p.id = :plantId', { plantId })
      .andWhere('m.channel IN (:...channels)', { channels })
      .andWhere('date = :day', { day });

    if (!isEmpty(excludeSourcePoints)) {
      queryBuilder.andWhere(
        'sp.source_point_code NOT IN (:...excludeSourcePoints)',
        { excludeSourcePoints },
      );
    }

    return queryBuilder.andWhere('sp.is_commercial').getRawMany();
  }
}
