import {
    ArgumentMetadata,
    HttpException,
    HttpStatus,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
// 管道验证
@Injectable()
export class LoginPipe implements PipeTransform {
    async transform(value: any, metadata: ArgumentMetadata) {
        console.log(value, metadata);
        const DTO = plainToInstance(metadata.metatype, value);
        let errors = await validate(DTO);
        if (errors.length) {
            throw new HttpException(errors, HttpStatus.BAD_REQUEST);
        }
        return value;
    }
}
