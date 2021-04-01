import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
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
  async getAllWork(): Promise<Work[]> {
    return this.workService.fetchAll();
  }

  @Get(':ref')
  async getWork(@Param('ref') ref: string): Promise<Work> {
    return this.workService.fetch(ref);
  }

  @UseInterceptors(PaginationInterceptor)
  @Get('list/:property')
  async getListByKey(@Param('property') property: string): Promise<string[]> {
    return this.workService.fetchPropertyValues(property);
  }
}
