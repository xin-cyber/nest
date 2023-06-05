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
    Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import type { Response } from 'express';
import { zip } from 'compressing';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}
    @Post('album')
    @UseInterceptors(FileInterceptor('file'))
    upload(@UploadedFile() file) {
        console.log(file); // 存放到dist目录下的images文件夹里面
        return '123456';
    }

    // 下载上面传的图片
    @Get('export')
    downLoad(@Res() res: Response) {
        const url = join(__dirname, '../images/1685972616800.jpg');
        // res
        console.log(url);
        res.download(url);
        // return  true
    }

    // 流的方式下载文件, 返回文件流
    @Get('stream')
    async down(@Res() res: Response) {
        const url = join(__dirname, '../images/1685972616800.jpg');
        const tarStream = new zip.Stream();
        await tarStream.addEntry(url);

        res.setHeader('Content-Type', 'application/octet-stream');

        res.setHeader('Content-Disposition', `attachment; filename=jx`);

        tarStream.pipe(res);
    }
}
