import { Controller, Get, Param } from '@nestjs/common';
import { AboutService } from './about.service';
import { About } from '../schemas/about.schema';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  async getAllAbout(): Promise<About[]> {
    return this.aboutService.fetchAll();
  }

  @Get(':subject')
  async getAbout(@Param('subject') subject: string): Promise<About> {
    return this.aboutService.fetch(subject);
  }
}
