import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuardModule } from './guard/guard.module';
import { LoginModule } from './login/login.module';
import { MysqlModule } from './mysql/mysql.module';
import { UploadModule } from './upload/upload.module';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import config from './config';
import { createClient } from 'redis';

@Module({
    imports: [
        // 动态配置数据库
        ConfigModule.forRoot({
            load: [config],
        }),
        UserModule,
        UploadModule,
        LoginModule,
        GuardModule,
        TypeOrmModule.forRoot({
            type: 'mysql', //数据库类型
            username: 'root', //账号
            password: '123456', //密码
            host: 'localhost', //host
            // host: "mysql-container",
            port: 3306, //
            database: 'login_test', //库名
            logging: true, // 日志
            entities: [User], //实体文件
            synchronize: true, //synchronize字段代表是否自动将实体类同步到数据库;开发环境使用，生产环境不使用，通过环境变量配置
            retryDelay: 500, //重试连接数据库间隔
            retryAttempts: 10, //重试连接数据库的次数
            // autoLoadEntities: true, //如果为true,将自动加载实体,不需要entities手动引入； forFeature()方法注册的每个实体都将自动添加到配置对象的实体数组中
        }),
        MysqlModule,
        // JwtModule 是一个动态模块，通过 register 传入 option,
        JwtModule.register({
            global: true, // 声明为全局模块 , 这样就不用每个模块都引入它了（其他模块直接forRoot,否则则需要register）
            secret: '_jx', // 加密秘钥
            signOptions: {
                expiresIn: '7d', // token 过期时间 7天
            },
        }),
        // 或者是 registerAsync，然后通过 useFactory 异步拿到 option 传入：
        // JwtModule.registerAsync({
        //     async useFactory() {
        //         await 111;
        //         return {
        //             secret: '__jx',
        //             signOptions: {
        //                 expiresIn: '7d',
        //             },
        //         };
        //     },
        // }),
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: 'REDIS_CLIENT',
            async useFactory() {
                const client = createClient({
                    socket: {
                        host: 'localhost',
                        // port: '6379',
                        // host: 'redis-container',
                    },
                });

                await client.connect()
                return client
            },
        },
    ],
})
export class AppModule {}
