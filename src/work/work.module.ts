import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilterModule } from '@nestjs-pf/mongoose-filters';
import { WorkController } from './work.controller';
import { WorkService } from './work.service';
import { Work, WorkSchema } from '../schemas/work.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Work.name, schema: WorkSchema }]),
    FilterModule.register({ model: Work.name, schema: WorkSchema })
  ],
  controllers: [WorkController],
  providers: [WorkService],
  exports: [MongooseModule]
})
export class WorkModule { }
