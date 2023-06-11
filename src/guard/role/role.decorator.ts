import { SetMetadata } from '@nestjs/common';

// 自定义装饰器
export const Role = (...args: string[]) => SetMetadata('role', args);
