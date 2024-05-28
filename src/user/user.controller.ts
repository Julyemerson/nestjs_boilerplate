import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserDto } from './dtos/user.dto';

@Controller('users')
export class UserController {
  @Post()
  async create(@Body() body: UserDto) {
    return {
      message: `User ${body.name} created!`,
    };
  }

  @Get()
  async findAll() {
    return { data: [] };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return {
      user: id,
    };
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: UserDto) {
    return {
      user: id,
      ...body,
    };
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return {
      message: `User ${id} deleted!`,
    };
  }
}
