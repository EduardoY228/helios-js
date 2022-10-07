import { Inject, Injectable } from '@nestjs/common';
import { Model30917Repository } from '@/api/model-30917/model-30917.repository';
import { Model30917Channel } from '@/api/model-30917/model-30917-channel.enum';
import { PlantService } from '@/api/plant/plant.service';
import { NoDataFoundException } from '@/exception/no-data-found.exception';
import { Plant } from '@/api/plant/plant.entity';
import { zip } from 'lodash';

@Injectable()
export class AscmeService {
  @Inject(Model30917Repository)
  private readonly model30917Repository: Model30917Repository;
  @Inject()
  private readonly plantService: PlantService;

  public async getDaySumByChannel({
    plantId,
    channels,
    day,
    excludeSourcePoints,
  }: {
    plantId: number;
    channels: Model30917Channel[];
    day: string;
    excludeSourcePoints?: number[];
  }) {
    if (!(await this.plantService.isPresent(plantId))) {
      throw new NoDataFoundException(Plant, plantId);
    }

    return this.model30917Repository
      .getDaySumByChannel(plantId, channels, day, excludeSourcePoints)
      .then((raws) =>
        raws.reduce(
          (acc, val) => ({
            ...acc,
            [val.m_channel]: val.sum,
          }),
          {},
        ),
      );
  }

  public async getDaysSumByChannel({
    plantId,
    channels,
    dayEnd,
    dayStart,
    excludeSourcePoints,
  }: {
    plantId: number;
    channels: Model30917Channel[];
    dayStart: string;
    dayEnd: string;
    excludeSourcePoints?: number[];
  }) {
    if (!(await this.plantService.isPresent(plantId))) {
      throw new NoDataFoundException(Plant, plantId);
    }

    return this.model30917Repository
      .getDaysSumByChannel(
        plantId,
        channels,
        dayStart,
        dayEnd,
        excludeSourcePoints,
      )
      .then((raws) =>
        raws.reduce(
          (acc, val) => ({
            ...acc,
            [val.m_channel]: val.sum,
          }),
          {},
        ),
      );
  }

  public async getDayKvtPerHalfHourByChannel({
    plantId,
    channels,
    day,
    excludeSourcePoints,
  }: {
    plantId: number;
    channels: Model30917Channel[];
    day: string;
    excludeSourcePoints?: number[];
  }) {
    if (!(await this.plantService.isPresent(plantId))) {
      throw new NoDataFoundException(Plant, plantId);
    }

    return this.model30917Repository
      .getDayKvtPerHalfHourByChannel(
        plantId,
        channels,
        day,
        excludeSourcePoints,
      )
      .then(
        (
          rows: { m_channel: Model30917Channel; kvt_per_half_hour: number[] }[],
        ) => {
          return rows.reduce(
            (acc, val) => ({
              ...acc,
              [val.m_channel]: acc[val.m_channel]
                ? zip(acc[val.m_channel], val.kvt_per_half_hour).map(
                    ([a, b]) => a + b,
                  )
                : val.kvt_per_half_hour,
            }),
            {} as Record<Model30917Channel, number[]>,
          );
        },
      );
  }
}
