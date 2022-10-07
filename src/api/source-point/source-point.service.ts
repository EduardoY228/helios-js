import { Inject, Injectable, Logger } from '@nestjs/common';
import { SourcePointRepository } from '@/api/source-point/source-point.repository';
import { SourcePointRequestUpdateDto } from '@/api/source-point/source-point.dto';

@Injectable()
export class SourcePointService {
  @Inject(SourcePointRepository)
  private readonly sourcePointRepository: SourcePointRepository;

  public async findAll() {
    return this.sourcePointRepository.find();
  }

  public async findByCode(code: bigint) {
    return this.sourcePointRepository.findByCode(code);
  }

  public async batchUpdate(payload: SourcePointRequestUpdateDto[]) {
    Logger.log('SourcePointService::batchUpdate', { ...payload });

    return await this.sourcePointRepository.batchUpdate(payload);
  }
}
