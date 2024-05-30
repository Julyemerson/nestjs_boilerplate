import { PrismaService } from './../prisma/prisma.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    try {
      return this.prisma.user.create({
        data,
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async list() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      console.log(error.message);
    }
  }

  async findOne(id: number) {
    try {
      return this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      console.log(error.message);
    }
  }

  async update(
    id: number,
    { name, email, password, role, birthAt }: UpdateUserDto,
  ) {
    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      data.password = password;
    }

    if (role) {
      data.role = role;
    }

    try {
      await this.userExists(id);
      return this.prisma.user.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new NotFoundException(` User with ID ${id} not found`);
    }
  }

  async remove(id: number) {
    try {
      await this.userExists(id);
      return this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException(` User with ID ${id} not found`);
    }
  }

  async userExists(id: number) {
    if (
      (await this.prisma.user.count({
        where: { id },
      })) === null
    ) {
      throw new NotFoundException(` User with ID ${id} not found`);
    }
  }
}
