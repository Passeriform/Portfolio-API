import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FilterModule } from '@nestjs-pf/mongoose-filters';
import { AboutController } from './about.controller';
import { AboutService } from './about.service';
import { About, AboutSchema } from '../schemas/about.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: About.name, schema: AboutSchema }]),
    FilterModule.register({ model: About.name, schema: AboutSchema }),
  ],
  controllers: [AboutController],
  providers: [AboutService],
  exports: [MongooseModule]
})
export class AboutModule { }
