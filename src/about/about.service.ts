import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';
import { LoaderService } from '../common/loader.service'

@Injectable()
export class AboutService {
  constructor(private readonly loaderService: LoaderService) { }

  describeFull(subject?: string): Promise<Array<Object>> {
    if (!subject) return this.loaderService.fetchFile("about.json");

    return this.loaderService.fetchFile("about.json")
      .then((workList: Array<Object>) =>
        workList.filter((work) =>
          work['subject'] === subject
        )
      );
  }
}
