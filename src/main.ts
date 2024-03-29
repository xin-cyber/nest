import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

const whiteList = ['/list'];

// 全局中间件
// function middleWareAll(req, res, next) {
//     console.log(req.originalUrl, '我收全局的');
//     if (whiteList.includes(req.originalUrl)) {
//         next();
//     } else {
//         res.send('全局中间件拦截黑名单');
//     }
// }

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // app.use(cors());
    // app.use(middleWareAll); // 全局中间件
    // app.useGlobalGuards(new RoleGuard()); // 全局守卫
    // app.useGlobalInterceptors(new Response()); // 全局拦截器，处理返回data
    // app.useGlobalFilters(new HttpFilter());

    // 访问upload/album 上传的静态资源图片
    // localhost:3000/jx/图片名
    // app.useStaticAssets(join(__dirname, 'images'), {
    //     prefix: '/jx',
    // });

    // app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);

    // session方式
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
