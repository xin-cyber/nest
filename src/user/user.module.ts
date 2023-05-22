import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { AppService2 } from '../app.service2';

import { UserController } from './user.controller';

@Module({
    controllers: [UserController],
    // 简写形式
    // providers: [UserService]
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
})
export class UserModule {}
