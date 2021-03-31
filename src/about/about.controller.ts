import { Controller, Get, Param } from '@nestjs/common';
import { FilterApi, FilterService } from '@nestjs-pf/mongoose-filters';
import { AboutService } from './about.service';
import { About } from '../schemas/about.schema';

@FilterApi()
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService, private readonly filterService: FilterService) { }

  @Get()
  async getAllAbout(): Promise<About[]> {
    return this.aboutService.fetchAll();
  }

  @Get(':subject')
  async getAbout(@Param('subject') subject: string): Promise<About> {
    return this.aboutService.fetch(subject);
  }
}
