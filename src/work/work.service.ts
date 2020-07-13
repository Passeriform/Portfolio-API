import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';
import { LoaderService } from '../common/loader.service'

@Injectable()
export class WorkService {
  constructor(private readonly loaderService: LoaderService) { }

  fetchAll(): Promise<Array<Object>> {
    return this.loaderService.fetchFile("work.json");
  }

  fetchList(key: string): Promise<Array<any>> {
    return this.loaderService.fetchFile("work.json")
      .then((workList: Array<Object>) =>
        workList
          .map((work) => work[key])
      )
      .then((valArray: Array<any>) =>
        ([] as Array<string>).concat(...valArray)
          .filter((value, idx, self) => self.indexOf(value) === idx && value != null)
      );
  }

  fetchAndFilter(key: string, value: string): Promise<Array<Object>> {
    return this.loaderService.fetchFile("work.json")
      .then((workList: Array<Object>) =>
        workList.filter((work) =>
          work[key] === value
        )
      );
  }
}
