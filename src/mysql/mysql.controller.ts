import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common';
import { MysqlService } from './mysql.service';
import { CreateMysqlDto } from './dto/create-mysql.dto';
import { UpdateMysqlDto } from './dto/update-mysql.dto';

@Controller('mysql')
export class MysqlController {
    constructor(private readonly MysqlService: MysqlService) {}

    @Post('/add/tags')
    addTags(@Body() params: { tags: string[]; userId: number }) {
        return this.MysqlService.addTags(params);
    }

    @Post()
    create(@Body() CreateMysqlDto: CreateMysqlDto) {
        return this.MysqlService.create(CreateMysqlDto);
    }

    @Get()
    findAll(
        @Query() query: { keyWord: string; page: number; pageSize: number },
    ) {
        return this.MysqlService.findAll({
            keyWord: '',
            page: 2,
            pageSize: 1,
        });
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateMysqlDto: UpdateMysqlDto) {
        return this.MysqlService.update(+id, UpdateMysqlDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.MysqlService.remove(+id);
    }
}
