import { PartialType } from '@nestjs/mapped-types';
import { CreateMysqlDto } from './create-mysql.dto';

export class UpdateMysqlDto extends PartialType(CreateMysqlDto) {}
