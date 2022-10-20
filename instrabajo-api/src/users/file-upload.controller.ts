import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileService } from './file-service';
import { ResponseModel } from './.dto/response.model';
import { CompareDto } from './.dto/compare.dto';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileservice: FileService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<any> {
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
