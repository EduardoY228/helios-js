import {
  ArgumentMetadata,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class GetEntityPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): any {
    Logger.debug(JSON.stringify(value));
    Logger.debug(JSON.stringify(metadata));

    return value;
  }
}
