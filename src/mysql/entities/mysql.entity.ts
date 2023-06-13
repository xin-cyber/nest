import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Generated,
    OneToMany,
} from 'typeorm';
import { Tags } from './tags.entity';

@Entity()
export class Mysql {
    //自增列
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column({ type: 'varchar', length: 200 })
    name: string;

    @Column({
        nullable: true, //在数据库中使列NULL或NOT NULL。 默认情况下，列是nullable：false
        comment: '注释',
        select: true, //定义在进行查询时是否默认隐藏此列。 设置为false时，列数据不会显示标准查询。 默认情况下，列是select：true
        default: 'xxxx', //加数据库级列的DEFAULT值
        primary: false, //将列标记为主要列。 使用方式和@ PrimaryColumn相同。
        update: true, //指示"save"操作是否更新列值。如果为false，则只能在第一次插入对象时编写该值。 默认值为"true"
        collation: '', //定义列排序规则。
    })
    password: string;

    @Column()
    desc: string;

    @Column({ type: 'int' })
    age: number;

    // 时间
    @CreateDateColumn({ type: 'timestamp' })
    create_time: Date;

    @Generated('uuid')
    uuid: string;

    @Column({
        type: 'enum',
        enum: ['1', '2', '3', '4'],
        default: '1',
    })
    roles: string;

    @Column('simple-array')
    names: string[];

    // 调用json.stringify方法存入数据库
    @Column('simple-json')
    profile: { name: string; nickname: string };

    // 关联tags表
    @OneToMany(() => Tags, (tags) => tags.user)
    tags: Tags[];
}
