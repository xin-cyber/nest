import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    await app.listen(3000);

    // app.use(
    //     session({
    //         resave: false, //添加 resave 选项
    //         saveUninitialized: true, //添加 saveUninitialized 选项
    //         secret: '_jx', // 服务端session 签名 ----加盐
    //         rolling: true, //在每次请求时强行设置 cookie，这将重置 cookie 过期时间(默认:false)
    //         name: '_jx.sid', // 客户端cookie 的名字
    //         cookie: { maxAge: 999999999 }, // cookie过期时间
    //     }),
    // );
}
bootstrap();
