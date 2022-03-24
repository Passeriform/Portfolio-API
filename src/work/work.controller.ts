import { Controller, Get, Optional, Param, Query, UseInterceptors } from '@nestjs/common';
import { FilterApi, FilterService } from '@nestjs-pf/mongoose-filters';
import { WorkService } from './work.service';
import { Work } from '../schemas/work.schema';
import { PaginationInterceptor } from '../pagination/pagination.interceptor'
import { AliasingInterceptor } from '../aliasing/aliasing.interceptor';

@UseInterceptors(AliasingInterceptor)
@FilterApi()
@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService, private readonly filterService: FilterService) { }

  @UseInterceptors(PaginationInterceptor)
  @Get()
  async getManyWork(@Optional() @Query() query): Promise<Work[]> {
    return this.workService.fetchMany(query.select);
  }

  @Get(':ref')
  async getWork(@Param('ref') ref: string): Promise<Work> {
    return this.workService.fetch(ref);
  }

  @Get('list/:property')
  async getListByKey(@Param('property') property: string): Promise<string[]> {
    return this.workService.fetchPropertyValues(property);
  }
}
