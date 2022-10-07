import { Inject, Injectable } from '@nestjs/common';
import { PositionRepository } from '@/api/position/position.repository';

@Injectable()
export class PositionService {
  @Inject(PositionRepository)
  private readonly positionRepository: PositionRepository;

  public async isPresent(id: number) {
    return this.positionRepository
      .count({ where: { id } })
      .then((res) => res === 1);
  }

  public async findById(id: number) {
    return this.positionRepository.findOne({ where: { id } });
  }
}
