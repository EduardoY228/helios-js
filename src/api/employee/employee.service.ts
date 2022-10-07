import { Inject, Injectable, Logger } from '@nestjs/common';
import {
  EmployeeCreateRequestDto,
  EmployeeUpdateRequestDto,
} from '@/api/employee/employee.dto';
import { EmployeeRepository } from '@/api/employee/employee.repository';
import { FileService } from '@/service/file.service';
import { PositionService } from '@/api/position/position.service';
import { NoDataFoundException } from '@/exception/no-data-found.exception';
import { Position } from '@/api/position/position.entity';
import { PlantService } from '@/api/plant/plant.service';
import { Plant } from '@/api/plant/plant.entity';
import { isNil, omit } from 'lodash';
import { ScheduleScheme } from '@/api/employee/employee.entity';

@Injectable()
export class EmployeeService {
  @Inject(EmployeeRepository)
  private readonly employeeRepository: EmployeeRepository;
  @Inject(FileService)
  private readonly fileService: FileService;
  @Inject(PositionService)
  private readonly positionService: PositionService;
  @Inject(PlantService)
  private readonly plantService: PlantService;

  public async create(
    employeeCreateRequestDto: EmployeeCreateRequestDto,
    token: string,
  ) {
    Logger.log('EmployeeService::create', {
      avatar: {
        size: employeeCreateRequestDto?.avatar?.size,
        ext: employeeCreateRequestDto?.avatar?.mimetype,
      },
      ...omit(employeeCreateRequestDto, 'avatar'),
    });

    const {
      avatar,
      plantIds,
      positionId,
      fiveDaySchedule,
      vacationsDates,
      workStartTimestamp,
      workHours,
      restHours,
      ...restPayload
    } = employeeCreateRequestDto;

    const [position, plantsAndCount]: [Position, [Plant[], number]] =
      await Promise.all([
        this.positionService.findById(positionId),
        this.plantService.getAllAndCountByIds(plantIds),
      ]);

    if (isNil(position)) {
      throw new NoDataFoundException(Position, positionId);
    }

    if (plantsAndCount[1] !== plantIds.length) {
      Logger.warn('Plants not found by ids', {
        ...plantsAndCount,
        plantIds,
      });
    }

    let avatarUrl: string;

    if (avatar) {
      avatarUrl = await this.fileService.upload(avatar, token);

      Logger.log('file url ' + avatarUrl);
    }

    return this.employeeRepository.save({
      position,
      plants: plantsAndCount[0],
      scheduleScheme: {
        fiveDaySchedule,
        workStartTimestamp,
        vacationsDates,
        workHours,
        restHours,
      },
      ...restPayload,
      ...(avatarUrl && { avatarUrl }),
    });
  }

  public async findAll() {
    return this.employeeRepository.find({
      relations: {
        position: true,
        plants: true,
      },
    });
  }

  public async findByPlantId(plantId: number) {
    return this.employeeRepository.findByPlantId(plantId);
  }

  public async findOne(id: number) {
    return this.employeeRepository.findOne({ where: { id } });
  }

  public async remove(id: number) {
    const employeeToRemove = await this.employeeRepository.findOne({
      where: { id },
      relations: {
        plants: true,
      },
    });

    const updateRes = await this.employeeRepository.save({
      ...employeeToRemove,
      plants: [],
    });

    Logger.log('EmployeeService::remove', { ...updateRes, employeeToRemove });

    return this.employeeRepository.delete(id);
  }

  public async isPresent(id: number) {
    return this.employeeRepository
      .count({ where: { id } })
      .then((res) => res === 1);
  }

  public async update(
    id: number,
    employeeUpdateRequestDto: EmployeeUpdateRequestDto,
    token: string,
  ) {
    Logger.log('EmployeeService::update', {
      avatar: {
        size: employeeUpdateRequestDto?.avatar?.size,
        ext: employeeUpdateRequestDto?.avatar?.mimetype,
      },
      ...omit(employeeUpdateRequestDto, 'avatar'),
    });

    const {
      avatar,
      deleteAvatar,
      plantIds,
      positionId,
      fiveDaySchedule,
      vacationsDates,
      workStartTimestamp,
      workHours,
      restHours,
      ...restPayload
    } = employeeUpdateRequestDto;

    const employeeToUpdate = await this.employeeRepository.findOne({
      where: { id },
    });

    if (positionId) {
      const position = await this.positionService.findById(positionId);

      if (isNil(position)) {
        throw new NoDataFoundException(Position, positionId);
      }

      employeeToUpdate.position = position;
    }

    if (plantIds) {
      const [plants, count] = await this.plantService.getAllAndCountByIds(
        plantIds,
      );

      Logger.log('EmployeeService::update plants fetched', { plants, count });

      employeeToUpdate.plants = plants;
    }

    if (deleteAvatar === true) {
      try {
        const fileServerDeletedFile = await this.fileService.delete(
          employeeToUpdate.avatarUrl.substring(
            employeeToUpdate.avatarUrl.lastIndexOf('/') + 1,
          ),
          token,
        );

        employeeToUpdate.avatarUrl = null;

        Logger.log('EmployeeService::update fileServer delete', {
          fileServerDeletedFile,
        });
      } catch (e) {
        employeeToUpdate.avatarUrl = null;

        Logger.warn(
          'EmployeeService::update fileServer delete -> file not found',
          { fileUrl: employeeToUpdate?.avatarUrl, error: e.message },
        );
      }
    }

    if (deleteAvatar !== true && avatar) {
      employeeToUpdate.avatarUrl = await this.fileService.upload(avatar, token);

      Logger.log('EmployeeService::update fileServer upload');
    }

    const updatedEmployee = await this.employeeRepository.save({
      ...employeeToUpdate,
      ...restPayload,
      scheduleScheme: this.updateScheduleSchema(
        employeeToUpdate.scheduleScheme,
        {
          fiveDaySchedule,
          vacationsDates,
          workStartTimestamp,
          workHours,
          restHours,
        },
      ),
    });

    Logger.log('EmployeeService::update end', { updatedEmployee });

    return this.employeeRepository.findOne({
      where: { id },
      relations: {
        plants: true,
        position: true,
      },
    });
  }

  private updateScheduleSchema(
    oldScheme: ScheduleScheme,
    {
      fiveDaySchedule,
      vacationsDates,
      workStartTimestamp,
      workHours,
      restHours,
    }: Partial<ScheduleScheme>,
  ) {
    if (
      fiveDaySchedule ||
      vacationsDates ||
      workStartTimestamp ||
      workHours ||
      restHours
    ) {
      return {
        ...oldScheme,
        ...((fiveDaySchedule === true || fiveDaySchedule === false) && {
          fiveDaySchedule,
        }),
        ...(vacationsDates && { vacationsDates }),
        ...(workStartTimestamp && { workStartTimestamp }),
        ...(workHours && { workHours }),
        ...(restHours && { restHours }),
      };
    }

    return oldScheme;
  }
}
