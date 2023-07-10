import {
    Body,
    Controller,
    Get,
    Headers,
    HttpCode,
    Inject,
    Param,
    Post,
    Query,
} from '@nestjs/common';

import { UserService } from './user.service';

@Controller('user') //  Controller 只需要被注入
export class UserController {
    // module注入后，userService可以是任意值，找到ioc中间容器保存映射，key是UserService，找到对应的实例对象,
    // this.userService可以直接使用该类的实例化对象，无需手动实例化
    // inject别名，解析JX
    constructor(
        @Inject('JX') private readonly userService: UserService, // 注入，并且是单例模式，如果该Service在其它地方也被用过，那么会在不会重新创建对象，各个应用只会有一个该Service的对象，容器会先寻找当前有没有，如果没有再进行创建
        @Inject('XJ') private ShopList: string[],
        @Inject('Test') private readonly test: string,
    ) {}

    @Post()
    create(@Body() req) {
        return {
            code: 200,
            message: req,
        };
    }

    @Get()
    findAll(@Query() req) {
        
        console.log(req);
        // return {
        //     code: 200,
        //     query: req,
        // };
        // return this.userService.findAll() + this.ShopList;
        return this.test;
    }

    @Get(':id')
    @HttpCode(500) //返回状态码500
    findOne(@Param('id') id: string, @Headers() headers) {
        console.log(id);
        console.log(headers);

        return {
            code: 200,
            id,
        };
    }

    // 图片验证码
    // @Get('code')
    // createCaptcha(@Req() req, @Res() res) {
    //     // console.log(req, res);
    //     // 验证码生成插件
    //     const captcha = svgCaptcha.create({
    //         size: 4, //生成几个验证码
    //         fontSize: 50, //文字大小
    //         width: 100, //宽度
    //         height: 34, //高度
    //         background: '#cc9966', //背景颜色
    //     });
    //     req.session.code = captcha.text; //存储验证码记录到session
    //     res.type('image/svg+xml');
    //     res.send(captcha.data); // 图片
    // }
    // @Post('create')
    // createUser(@Req() req, @Body() body) {
    //     console.log(req.session.code, body); //  req.session.code上面保存的session  ;  body:表单
    //     if (
    //         req.session.code.toLocaleLowerCase() ===
    //         body?.code?.toLocaleLowerCase()
    //     ) {
    //         return {
    //             message: '验证码正确',
    //         };
    //     } else {
    //         return {
    //             message: '验证码错误',
    //         };
    //     }
    // }
}
