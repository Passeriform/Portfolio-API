import { Module } from '@nestjs/common';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { LoaderService } from '../common/loader.service';

@Module({
  controllers: [WorkController],
  providers: [WorkService, LoaderService],
})
export class WorkModule {}
