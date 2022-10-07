import {
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  DaysSumByChannelRequestDto,
  DaySumByChannelRequestDto,
} from '@/api/ascme/ascme.dto';
import { AscmeService } from '@/api/ascme/ascme.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/api/auth/jwt-auth.guard';
import { RolesGuard } from '@/api/auth/roles.guard';

@ApiBearerAuth()
@ApiTags('ascme')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('api/v1/ascme')
export class AscmeController {
  @Inject()
  private readonly ascmeService: AscmeService;

  @HttpCode(200)
  @Post('/daySumByChannel')
  public getDaySumByChannel(
    @Body() daySumByChannelRequestDto: DaySumByChannelRequestDto,
  ) {
    return this.ascmeService.getDaySumByChannel(daySumByChannelRequestDto);
  }

  @HttpCode(200)
  @Post('/daysSumByChannel')
  public getDaysSumByChannel(
    @Body() daysSumByChannelRequestDto: DaysSumByChannelRequestDto,
  ) {
    return this.ascmeService.getDaysSumByChannel(daysSumByChannelRequestDto);
  }

  @HttpCode(200)
  @Post('/dayKvtPerHalfHourByChannel')
  public getDayKvtPerHalfHourByChannel(
    @Body() dayKvtPerHalfHourByChannelRequest: DaySumByChannelRequestDto,
  ) {
    return this.ascmeService.getDayKvtPerHalfHourByChannel(
      dayKvtPerHalfHourByChannelRequest,
    );
  }
}
