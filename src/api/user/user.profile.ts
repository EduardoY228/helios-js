import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from '@automapper/core';
import { User } from '@/api/user/user.entity';
import { UserResponseDto } from '@/api/user/user.dto';

@Injectable()
export class UserProfile extends AutomapperProfile {
  get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        User,
        UserResponseDto,
        forMember(
          (d) => d.plants,
          mapFrom((s) => s.plants?.map((p) => p.id) || []),
        ),
      );
    };
  }

  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
}
