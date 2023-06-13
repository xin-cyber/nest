import {
    Column,
    Entity,
    PrimaryGeneratedColumn,
    BeforeInsert,
    CreateDateColumn,
    Generated,
    OneToOne,
    JoinColumn,
    ManyToOne,
} from 'typeorm';
import { Mysql } from './mysql.entity';
@Entity()
export class Tags {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tags: string;

    @ManyToOne(() => Mysql, (user) => user.tags)
    @JoinColumn()
    user: Mysql;
}
