import { Controller, Get, Optional, Param, Query, UseInterceptors } from '@nestjs/common';
import { FilterApi, FilterService } from '@nestjs-pf/mongoose-filters';
import { AboutService } from './about.service';
import { About } from '../schemas/about.schema';
import { PaginationInterceptor } from '../pagination/pagination.interceptor';
import { AliasingInterceptor } from '../aliasing/aliasing.interceptor';

// TODO: Use dynamic find filters from query params in mongoose-filter routes using Interceptor to catch the request, validate the params
@UseInterceptors(AliasingInterceptor)
@FilterApi()
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService, private readonly filterService: FilterService) { }

  @UseInterceptors(PaginationInterceptor)
  @Get()
  async getManyAbout(@Optional() @Query() query): Promise<About[]> {
    return this.aboutService.fetchMany(query.select);
  }

  @Get(':subject')
  async getAbout(@Param('subject') subject: string, @Optional() @Query() query): Promise<About> {
    return this.aboutService.fetch(subject, query.select);
  }
}
