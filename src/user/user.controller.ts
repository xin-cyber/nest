import {
    Controller,
    Request,
    Query,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Headers,
    HttpCode,
    Req,
    Res,
} from '@nestjs/common';
import * as svgCaptcha from 'svg-captcha';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    // @Post()
    // create(@Body() req) {
    //     return {
    //         code: 200,
    //         message: req,
    //     };
    // }

    // @Get()
    // findAll(@Query() req) {
    //     console.log(req);
    //     return {
    //         code: 200,
    //         query: req,
    //     };
    //     // return this.userService.findAll();
    // }

    // @Get(':id')
    // @HttpCode(500) //返回状态码500
    // findOne(@Param('id') id: string, @Headers() headers) {
    //     console.log(id);
    //     console.log(headers);

    //     return {
    //         code: 200,
    //         id,
    //     };
    // }

    // 图片验证码
    @Get('code')
    createCaptcha(@Req() req, @Res() res) {
        // console.log(req, res);
        // 验证码生成插件
        const captcha = svgCaptcha.create({
            size: 4, //生成几个验证码
            fontSize: 50, //文字大小
            width: 100, //宽度
            height: 34, //高度
            background: '#cc9966', //背景颜色
        });
        req.session.code = captcha.text; //存储验证码记录到session
        res.type('image/svg+xml');
        res.send(captcha.data); // 图片
    }
    @Post('create')
    createUser(@Req() req, @Body() body) {
        console.log(req.session.code, body); //  req.session.code上面保存的session  ;  body:表单
        if (
            req.session.code.toLocaleLowerCase() ===
            body?.code?.toLocaleLowerCase()
        ) {
            return {
                message: '验证码正确',
            };
        } else {
            return {
                message: '验证码错误',
            };
        }
    }
}
