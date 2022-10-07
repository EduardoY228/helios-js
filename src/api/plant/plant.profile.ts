import { Injectable } from '@nestjs/common';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Plant } from '@/api/plant/plant.entity';
import { createMap, forMember, mapFrom, Mapper } from '@automapper/core';
import { PlantResponseDto } from '@/api/plant/plant.dto';

@Injectable()
export class PlantProfile extends AutomapperProfile {
  get profile() {
    return (mapper) => {
      createMap(
        mapper,
        Plant,
        PlantResponseDto,
        forMember(
          (d) => d.userId,
          mapFrom((s) => s.user.id),
        ),
      );
    };
  }

  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
}
