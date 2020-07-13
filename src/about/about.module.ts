import { Module } from '@nestjs/common';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { LoaderService } from '../common/loader.service';

@Module({
  controllers: [AboutController],
  providers: [AboutService, LoaderService],
})
export class AboutModule {}
