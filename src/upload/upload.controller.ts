import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
    @Post('album')
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file) {
        console.log(file); // 存放到dist目录下的images文件夹里面
        return '123456';
    }
}
