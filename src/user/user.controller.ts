import { UserService } from './user.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { LogInterceptor } from 'src/interceptors/log.interceptor';
import { ParamId } from 'src/decorators/param-id.decorator';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(LogInterceptor)
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

  @UseInterceptors(LogInterceptor)
  @Delete(':id')
  async remove(@ParamId() id: number) {
    return this.userService.remove(id);
  }
}
