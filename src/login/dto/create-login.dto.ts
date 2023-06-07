import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateLoginDto {
    @IsNotEmpty() //验证是否为空
    @IsString({
        message: 'name是字符串',
    }) //是否为字符串
    name: string;
    @IsNotEmpty()
    @IsNumber()
    age: number;
}
