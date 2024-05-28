import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() { name }: CreateUserDto) {
    return {
      message: `User ${name} created!`,
    };
  }

  @Get()
  async findAll() {
    return { data: [] };
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return {
      user: id,
    };
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateUserDto,
  ) {
    return {
      user: id,
      ...body,
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return {
      id,
    };
  }
}
