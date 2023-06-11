import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
    constructor(private Reflector: Reflector) {}
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        let admin = this.Reflector.get<string[]>('role', context.getHandler()); // role对于controller ； 函数体
        console.log('经过了守卫', admin);
        // if () {
        // } else {
        //   } // 权限校验
        return true;
    }
}
