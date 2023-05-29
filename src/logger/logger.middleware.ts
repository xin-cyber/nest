import { Injectable, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        // 白名单拦截
        console.log('经过logger中间件');
        // res.send('Logger 中间件拦截');
        next();
    }
}
