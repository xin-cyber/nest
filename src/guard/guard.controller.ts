import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    SetMetadata,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role/role.guard';
import { Role } from './role/role.decorator'; //自定义装饰器
@Controller('guard')
@UseGuards(RoleGuard)
export class GuardController {
    constructor(private readonly guardService: GuardService) {}

    @Post()
    create(@Body() createGuardDto: CreateGuardDto) {
        return this.guardService.create(createGuardDto);
    }

    @Get()
    // @SetMetadata('roles', ['admin', 'publish'])
    @Role('admin') // 等价上一个
    findAll() {
        return this.guardService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.guardService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
        return this.guardService.update(+id, updateGuardDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.guardService.remove(+id);
    }
}
