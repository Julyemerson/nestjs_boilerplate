import { PrismaService } from './../prisma/prisma.service';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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
      throw new InternalServerErrorException(error.message);
    }
  }

  async list() {
    try {
      return this.prisma.user.findMany();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(id: number) {
    await this.userExists(id);

    try {
      return this.prisma.user.findUnique({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async update(
    id: number,
    { name, email, password, role, birthAt }: UpdateUserDto,
  ) {
    await this.userExists(id);

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
      return this.prisma.user.update({
        where: {
          id,
        },
        data,
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async remove(id: number) {
    await this.userExists(id);
    try {
      return this.prisma.user.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async userExists(id: number) {
    const user = await this.prisma.user.count({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(` User with ID ${id} not found`);
    }
  }
}
