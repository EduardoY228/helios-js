import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Plant } from '@/api/plant/plant.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class PlantRepository extends Repository<Plant> {
  constructor(private dataSource: DataSource) {
    super(Plant, dataSource.createEntityManager());
  }

  public async findById(id: number): Promise<Plant> {
    return this.dataSource.getRepository(Plant).findOne({
      where: { id },
      relations: {
        user: true,
        documents: true,
      },
    });
  }

  public async findByUserId(userId: number): Promise<Plant[]> {
    return this.dataSource
      .getRepository(Plant)
      .createQueryBuilder('plants')
      .leftJoinAndSelect('plants.user', 'user')
      .leftJoinAndSelect('plants.documents', 'document')
      .where('plants.user_id = :userId', { userId })
      .getMany();
  }

  public async findCoordinatesById(id: number) {
    return this.dataSource
      .getRepository(Plant)
      .createQueryBuilder('plants')
      .select(['plants.location'])
      .where('id = :id', { id })
      .getRawOne()
      .then((res) => res.plants_location);
  }

  public async updateById(id: number, payload: QueryDeepPartialEntity<Plant>) {
    const res = await this.createQueryBuilder()
      .update({
        ...payload,
      })
      .where({
        id,
      })
      .returning('*')
      .execute();

    return res.raw[0] as Plant;
  }

  public async getAllAndCountByIds(ids: number[]) {
    return this.createQueryBuilder().whereInIds(ids).getManyAndCount();
  }
}
