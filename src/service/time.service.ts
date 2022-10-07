import { Injectable } from '@nestjs/common';
import { formatInTimeZone, zonedTimeToUtc } from 'date-fns-tz';
import { format, parse, parseISO } from 'date-fns';

export type Timestamp =
  `${number}${number}${number}${number}-${number}${number}-${number}${number}`;

const t: Timestamp = '0000-00-00';

@Injectable()
export class TimeService {
  private readonly TIMESTAMP_ZONED_PATTERN = `yyyy-MM-dd HH:mm:ssXXX`;
  private readonly TIME_ZONE = 'Europe/Kiev';

  public get currentTimestampZoned() {
    return formatInTimeZone(
      new Date(),
      this.TIME_ZONE,
      this.TIMESTAMP_ZONED_PATTERN,
    );
  }

  public parseFromISO(timestamp: string) {
    return zonedTimeToUtc(timestamp, this.TIME_ZONE);
  }

  public from(year: number, month: number, day: number) {
    if (!(month <= 11 && month >= 0)) {
      throw new Error('');
    }

    format(new Date(2022, 1, 11), this.TIMESTAMP_ZONED_PATTERN);
  }
}
