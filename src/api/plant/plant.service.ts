import { Inject, Injectable, Logger } from '@nestjs/common';
import { PlantRepository } from '@/api/plant/plant.repository';
import {
  PlantCreateRequestDto,
  PlantUpdateRequestDto,
} from '@/api/plant/plant.dto';
import { DocumentService } from '@/api/document/document.service';
import { Document } from '@/api/document/document.entity';
import { UserService } from '@/api/user/user.service';
import { NoDataFoundException } from '@/exception/no-data-found.exception';
import { User } from '@/api/user/user.entity';
import { isNil } from 'lodash';
import { TimeService } from '@/service/time.service';
import { Plant } from '@/api/plant/plant.entity';

@Injectable()
export class PlantService {
  @Inject(PlantRepository)
  private readonly plantRepository: PlantRepository;
  @Inject(DocumentService)
  private readonly documentService: DocumentService;
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(TimeService)
  private readonly timeService: TimeService;

  public async create(
    plantCreateRequestDto: PlantCreateRequestDto,
    token: string,
  ) {
    Logger.log('PlantService::create', {
      plantCreateRequestDto,
      documents: plantCreateRequestDto.documents.map(
        ({ originalName, size, mimetype }) => ({
          fileName: originalName,
          size: size,
          ext: mimetype,
        }),
      ),
    });

    const {
      userId,
      documents,
      documentTypes,
      latitude,
      longitude,
      status,
      ...restCreatePayload
    } = plantCreateRequestDto;

    const documentsSaved: Document[] = [];
    const user = await this.userService.findById(userId);

    if (isNil(user)) {
      throw new NoDataFoundException(User, userId);
    }

    if (documents?.length) {
      documentsSaved.push(
        ...(await this.documentService.createMany(
          documents.map((doc, i) => ({
            file: doc,
            documentType: documentTypes[i],
          })),
          token,
        )),
      );

      Logger.log('PlantService::create documents saved', {
        ...documentsSaved,
      });
    }

    return this.plantRepository.save({
      documents: documentsSaved,
      location: {
        lat: latitude,
        lon: longitude,
      },
      user,
      status,
      statusSchedule: {
        [this.timeService.currentTimestampZoned]: status,
      },
      ...restCreatePayload,
    });
  }

  public async findById(id: number) {
    Logger.log('PlantService::findById', { id });

    return this.plantRepository.findById(id);
  }

  public async findAll() {
    Logger.log('PlantService::findAll');

    return this.plantRepository.find({
      relations: {
        user: true,
        documents: true,
        employees: true,
      },
    });
  }

  public async findAllByUserId(userId: number) {
    Logger.log('PlantService::findAllByUserId', { userId });

    return this.plantRepository.findByUserId(userId);
  }

  public async deleteById(id: number) {
    Logger.log('PlantService::deleteById', { id });

    return this.plantRepository.delete(id);
  }

  public async update(
    { latitude, longitude, status, ...restUpdate }: PlantUpdateRequestDto,
    id: number,
  ) {
    Logger.log('PlantService::update', {
      latitude,
      longitude,
      status,
      ...restUpdate,
    });

    const { location: locationOld, statusSchedule } =
      await this.plantRepository.findOne({
        where: { id },
      });

    const res = await this.plantRepository.update(id, {
      ...restUpdate,
      ...((longitude || latitude) && {
        location: {
          ...locationOld,
          ...(longitude && { lon: longitude }),
          ...(latitude && { lat: latitude }),
        },
      }),
      ...(status && {
        statusSchedule: {
          ...statusSchedule,
          [this.timeService.currentTimestampZoned]: status,
        },
        status,
      }),
    });

    Logger.log('PlantService::update end', { ...res });

    return this.plantRepository.findOne({
      where: { id },
      relations: {
        user: true,
        documents: true,
        employees: true,
      },
    });
  }

  public async isPresent(id: number): Promise<boolean> {
    return this.plantRepository
      .count({ where: { id } })
      .then((res) => res === 1);
  }

  public async getAllAndCountByIds(ids: number[]) {
    return this.plantRepository.getAllAndCountByIds(ids);
  }

  public async saveAll(plants: Plant[]) {
    return this.plantRepository.save(plants);
  }
}
