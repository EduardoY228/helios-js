import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  UserCreateRequestDto,
  UserProfileUpdateRequestDto,
  UserResponseDto,
  UserUpdateRequestDto,
} from './user.dto';
import { User } from './user.entity';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { hash } from 'bcrypt';
import { FileService } from '@/service/file.service';
import { omit } from 'lodash';
import { UserRepository } from '@/api/user/user.repository';

@Injectable()
export class UserService {
  @Inject(UserRepository)
  private readonly repository: UserRepository;
  @Inject(FileService)
  private readonly fileService: FileService;
  @InjectMapper()
  private readonly classMapper: Mapper;

  public async findByEmail(email: string) {
    return this.classMapper.mapAsync(
      await this.repository.findOne({ where: { email } }),
      User,
      UserResponseDto,
    );
  }

  public async findUserByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  public async create(payload: UserCreateRequestDto, token: string) {
    Logger.log('UserService::create', payload);
    let avatarUrl: string;

    if (payload.avatar) {
      avatarUrl = await this.fileService.upload(payload.avatar, token);

      Logger.log('file url ' + avatarUrl);
    }

    return this.classMapper.mapAsync(
      await this.repository.save({
        ...(omit(payload, 'avatar') as User),
        password: await hash(payload.password, 12),
        avatarUrl,
      }),
      User,
      UserResponseDto,
    );
  }

  public async update(
    id: number,
    payload: UserUpdateRequestDto | UserProfileUpdateRequestDto,
    token: string,
  ) {
    Logger.log('UserService update', payload);

    let avatarUrl: string;

    if (payload.avatar) {
      avatarUrl = await this.fileService.upload(
        payload.avatar,
        token.substring(7, token.length),
      );

      Logger.debug('file url ' + avatarUrl);
    }

    return this.classMapper.mapAsync(
      await this.repository.updateById({
        ...omit({ ...payload, id }, 'avatar'),
        ...(avatarUrl && { avatarUrl }),
        ...(payload.password && { password: await hash(payload.password, 12) }),
      }),
      User,
      UserResponseDto,
    );
  }

  public async getAll() {
    Logger.log('UserService::getAll');

    return this.classMapper.mapArrayAsync(
      await this.repository.find(),
      User,
      UserResponseDto,
    );
  }

  public async deleteById(id: number) {
    Logger.log('UserService::deleteById', { id });

    return this.repository.delete(id).then((result) => result.affected);
  }

  public async isPresent(email: string) {
    return (await this.repository.count({ where: { email } })) === 1;
  }

  public async isPresentById(id: number) {
    return (await this.repository.count({ where: { id } })) === 1;
  }

  public async findById(id: number) {
    Logger.log('UserService::findById', { id });

    return this.repository.findOne({ where: { id } });
  }
}
