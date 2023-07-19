import * as crypto from 'crypto';
import { Repository } from 'typeorm';

import {
    HttpException,
    Injectable,
    Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { User } from './entities/user.entity';

function md5(str) {
    const hash = crypto.createHash('md5');
    hash.update(str);
    return hash.digest('hex');
}

@Injectable() // 标识此类可以被注入，由Nest的IoC容器管理，UserModule中注入（provider）
export class UserService {
    private logger = new Logger();

    // 将User实体的仓库(repository)注入到当前类中,以便在类的其他方法中可以直接使用userRepository来访问和操作User实体的数据库表
    // 避免在每个方法中都手动创建和管理User实体的仓库(repository)实例，提高了代码的可维护性和可读性
    @InjectRepository(User)
    private userRepository: Repository<User>;

    async register(user: RegisterDto) {
        const foundUser = await this.userRepository.findOneBy({
            username: user.username,
        });

        if (foundUser) {
            throw new HttpException('用户已存在', 200);
        }

        const newUser = new User();
        newUser.username = user.username;
        newUser.password = md5(user.password);

        try {
            await this.userRepository.save(newUser);
            return '注册成功';
        } catch (e) {
            this.logger.error(e, UserService);
            return '注册失败';
        }
    }

    async login(user: LoginDto) {
        const foundUser = await this.userRepository.findOneBy({
            username: user.username,
        });

        if (!foundUser) {
            throw new HttpException('用户名不存在', 200);
        }
        if (foundUser.password !== md5(user.password)) {
            throw new HttpException('密码错误', 200);
        }
        return foundUser;
    }
}
