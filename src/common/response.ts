import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
} from '@nestjs/common';

interface data<T> {
    data: T;
}

// 统一接口格式返回 ;  拦截器
@Injectable()
export class Response<T = any> implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler,
    ): Observable<data<T>> {
        return next.handle().pipe(
            map((data) => {
                return {
                    data,
                    status: 0,
                    success: true,
                    message: '牛逼',
                };
            }),
        );
    }
}
