import {
    MiddlewareConsumer,
    Module,
    NestModule,
    RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppService2 } from '../app.service2';
import { LoggerMiddleware } from '../logger/logger.middleware';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

// @Global
@Module({
    imports: [TypeOrmModule.forFeature([User])],
    // imports: [OtherModule], 意味着OtherModule里exports的service类，可以在provider中的AppService2等service类中使用
    controllers: [UserController],
    // 简写形式
    // providers: [UserService]  // 提供依赖项并且是单例模式，将类交由ico容器创建实例
    providers: [
        AppService2,
        {
            provide: 'JX', // 自定义名称
            useClass: UserService,
        },
        {
            provide: 'XJ', // 自定义注入值
            useValue: ['TB', 'PDD', 'JD'],
        },
        {
            provide: 'Test',
            inject: [AppService2],
            useFactory(AppService2: AppService2) {
                console.log(AppService2.getHello());

                // if (true) {
                //     return 'class1';
                // } else {
                //     return 'class2';
                // }
                return AppService2.getHello();
            },
        },
    ],
    // exports:[AppService2] // exports可以使用provider本身，亦可以使用provider的token
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes({
            path: 'user',
            method: RequestMethod.GET,
        }); ///直接传入UserController，所有的都被拦截了
    }
}
