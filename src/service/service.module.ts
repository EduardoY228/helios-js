import { Global, Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { FileService } from '@/service/file.service';
import { TimeService } from '@/service/time.service';

@Global()
@Module({
  imports: [HttpModule],
  providers: [FileService, TimeService],
  exports: [FileService, TimeService],
})
export class ServiceModule {}
