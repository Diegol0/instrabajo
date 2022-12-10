import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CompareDto } from './.dto/compare.dto';
import { ResponseModel } from './.dto/response.model';
import { FileService } from './file-service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileservice: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<any> {
    console.log(req);
    const result = await this.fileservice.uploadPublicFile(
      file.buffer,
      file.originalname.replace(/\W/g, ''),
    );

    return new ResponseModel(result);
  }

  @Post('compare')
  async compare(@Body() compare: CompareDto): Promise<any> {
    return this.fileservice.compareFaces(compare);
  }
}
