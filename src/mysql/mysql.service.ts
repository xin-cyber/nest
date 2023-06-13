import { Injectable } from '@nestjs/common';
import { CreateMysqlDto } from './dto/create-mysql.dto';
import { UpdateMysqlDto } from './dto/update-mysql.dto';

import { Repository, Like } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Mysql } from './entities/mysql.entity';

import { Tags } from './entities/tags.entity';

@Injectable()
export class MysqlService {
    constructor(
        @InjectRepository(Mysql) private readonly Mysql: Repository<Mysql>,
        @InjectRepository(Tags) private readonly tag: Repository<Tags>,
    ) {}
    create(CreateMysqlDto: CreateMysqlDto) {
        const data = new Mysql();
        data.name = CreateMysqlDto.name;
        data.desc = CreateMysqlDto.desc;
        return this.Mysql.save(data);
    }

    async findAll(query: { keyWord: string; page: number; pageSize: number }) {
        const data = await this.Mysql.find({
            where: {
                name: Like(`%${query.keyWord}%`),
            },
            order: {
                id: 'DESC',
            },
            skip: (query.page - 1) * query.pageSize,
            take: query.pageSize,
        });
        const total = await this.Mysql.count({
            where: {
                name: Like(`%${query.keyWord}%`),
            },
        });
        return {
            data,
            total,
        };
    }

    update(id: number, UpdateMysqlDto: UpdateMysqlDto) {
        return this.Mysql.update(id, UpdateMysqlDto);
    }

    remove(id: number) {
        return this.Mysql.delete(id);
    }

    //通过前端传入的userId 查到当前id 的用户信息，然后拿到前端传入的tags [tag1,tag2,tag3]
    // 进行遍历 给tag实例进行赋值 然后调用保存方法添加tag 添加完之后 通过 tagList 保存该tag类
    // 最后把tagList 赋给 user类的tags属性 然后重新调用save 进行更新

    async addTags(params: { tags: string[]; userId: number }) {
        const userInfo = await this.Mysql.findOne({
            where: { id: params.userId },
        });
        const tagList: Tags[] = [];
        for (let i = 0; i < params.tags.length; i++) {
            let T = new Tags();
            T.tags = params.tags[i];
            await this.tag.save(T);
            tagList.push(T);
        }
        userInfo.tags = tagList;
        console.log(userInfo, 1);
        return this.Mysql.save(userInfo);
    }
}
