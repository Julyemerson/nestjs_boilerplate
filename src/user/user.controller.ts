import { UserService } from './user.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { ParamId } from 'src/decorators/param-id.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RoleGuard } from 'src/guards/role.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Roles(Role.ADMIN)
@UseGuards(AuthGuard, RoleGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() data: CreateUserDto) {
    return this.userService.create(data);
  }

  @Get()
  async findAll() {
    return this.userService.list();
  }
  @Get(':id')
  async findOne(@ParamId() id: number) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  async update(@ParamId() id: number, @Body() body: UpdateUserDto) {
    return this.userService.update(id, body);
  }

  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@ParamId() id: number) {
    return this.userService.remove(id);
  }
}
