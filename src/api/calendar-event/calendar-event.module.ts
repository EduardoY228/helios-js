import { Module } from '@nestjs/common';
import { CalendarEventController } from './calendar-event.controller';
import { CalendarEventService } from './calendar-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from './calendar-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEvent])],
  controllers: [CalendarEventController],
  providers: [CalendarEventService],
})
export class CalendarEventModule {}
