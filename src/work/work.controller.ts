import { Controller, Param, Get } from '@nestjs/common';
import { WorkService } from './work.service';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  async getAllWork(): Promise<Array<Object>> {
    return this.workService.fetchAll();
  }

  @Get(':listKey')
  async getListByKey(@Param('listKey') listKey: string): Promise<Array<string>> {
    return this.workService.fetchList(listKey);
  }

  // Need to chain filters together later
  @Get('filter/:key/:value')
  async getAllFromKey(@Param('key') key: string, @Param('value') value: string): Promise<Array<Object>> {
    return this.workService.fetchAndFilter(key, value);
  }
}
