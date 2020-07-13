import { Injectable } from '@nestjs/common';
import * as aws from 'aws-sdk';

@Injectable()
export class LoaderService {
  async fetchFile(path: string): Promise<any> {
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });

    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: path
    };

    const file = await new Promise((resolve, reject) => {
      s3.getObject(params, (err, data) => {
        if (err) reject(err);



        resolve(JSON.parse(data && data.Body.toString('utf-8')));
      });
    });

    return file;
  }
}
