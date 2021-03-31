import { Controller, Get, Param } from '@nestjs/common';
import { WorkService } from './work.service';
import { Work } from '../schemas/work.schema';

@Controller('work')
export class WorkController {
  constructor(private readonly workService: WorkService) {}

  @Get()
  async getAllWork(): Promise<Work[]> {
    return this.workService.fetchAll();
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
