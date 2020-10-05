import { Controller, Param, Get } from '@nestjs/common';
import { WorkService } from './work.service';
import { Work } from '../schemas/work.schema';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  async getAllWork(): Promise<Array<Work>> {
    return this.workService.fetchAll();
  }

  @Get(':ref')
  async getWork(@Param('ref') ref): Promise<Work> {
    return this.workService.fetch(ref);
  }

  @Get('list/:listKey')
  async getListByKey(@Param('listKey') listKey: string): Promise<Array<any>> {
    return this.workService.fetchList(listKey);
  }

  // Need to chain filters together later
  @Get('filter/:key/:value')
  async getAllFromKey(@Param('key') key: string, @Param('value') value: string): Promise<Array<Work>> {
    return this.workService.fetchAndFilter(key, value);
  }
}
