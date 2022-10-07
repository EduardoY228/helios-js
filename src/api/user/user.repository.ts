import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { User } from '@/api/user/user.entity';
import { omit } from 'lodash';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  public async updateById(payload: QueryDeepPartialEntity<User>) {
    const res = await this.createQueryBuilder()
      .update(omit(payload, 'id'))
      .where({
        id: payload.id,
      })
      .returning('*')
      .execute();

    return res.raw[0] as User;
  }
}
