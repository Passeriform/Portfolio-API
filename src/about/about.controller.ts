import { Controller, Param, Get } from '@nestjs/common';
import { AboutService } from './about.service';

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
  async getTypes(@Param('subject') subject: string): Promise<Array<Object>> {
    return this.aboutService.describeFull(subject);
  }

  // Need to chain filters together later
  /*
  * @Get('filter/:key/:value')
  * async getAllFromType(@Param() key: string, @Param() value: string): Promise<Array<Object>> {
  *   return this.workService.fetchAndFilter(key, value);
  * }
  */
}
