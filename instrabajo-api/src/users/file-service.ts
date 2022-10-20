import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { Rekognition } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { ResponseModel } from './.dto/response.model';
import { CompareDto } from './.dto/compare.dto';

@Injectable()
export class FileService {
  async uploadPublicFile(dataBuffer: Buffer, filename: string) {
    try {
      const s3 = new S3();
      const uploadResult = await s3
        .upload({
          Bucket: 'instrabajo-dev',
          Body: dataBuffer,
          Key: `${uuid()}-${filename}`,
        })
        .promise();

      return {
        key: uploadResult.Key,
        url: uploadResult.Location,
      };
    } catch (err) {
      console.log(err);
      return { key: 'error', url: err.message };
    }
  }

  async compareFaces(compare: CompareDto) {
    let result = null;
    try {
      const r = new Rekognition();
      result = await r
        .compareFaces({
          SourceImage: {
            S3Object: {
              Bucket: 'instrabajo-dev',
              Name: compare.source.replace(
                'https://instrabajo-dev.s3.amazonaws.com/',
                '',
              ),
            },
          },
          TargetImage: {
            S3Object: {
              Bucket: 'instrabajo-dev',
              Name: compare.target.replace(
                'https://instrabajo-dev.s3.amazonaws.com/',
                '',
              ),
            },
          },
          SimilarityThreshold: 70,
        })
        .promise();
    } catch (err) {
      console.log(err);
      return { key: 'error', url: err.message };
    }
    console.log(result);
    return new ResponseModel(result);
  }
}
