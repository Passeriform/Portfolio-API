import { Controller, Get, Param } from '@nestjs/common';
import { AboutService } from './about.service';
import { About } from '../schemas/about.schema';

@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  /*
  * @Get()
  * async getAllAbout(): Promise<Array<Object>> {
  *   return "Try dynamic routes here";
  * }
  */

  @Get(':subject')
  async getTypes(@Param('subject') subject: string): Promise<About> {
    return this.aboutService.fetch(subject);
  }

  // Need to chain filters together later
  /*
  * @Get('filter/:key/:value')
  * async getAllFromType(@Param() key: string, @Param() value: string): Promise<Array<Object>> {
  *   return this.workService.fetchAndFilter(key, value);
  * }
  */
}
