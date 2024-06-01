import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRegisterDto } from './dto/auth.register.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
  ) {}

  createToken({ email, id, name }: User) {
    return {
      access_token: this.jwtService.sign(
        {
          id,
          name,
          email,
        },
        {
          expiresIn: '7 days',
          subject: String(id),
          issuer: 'login',
          audience: 'user',
        },
      ),
    };
  }

  checkToken(token: string) {
    try {
      const data = this.jwtService.verify(token, {
        issuer: 'login',
        audience: 'user',
      });

      return data;
    } catch (error) {
      throw new UnauthorizedException(error.message);
    }
  }

  isValidToken(token: string) {
    try {
      this.checkToken(token);
      return true;
    } catch (error) {
      return false;
    }
  }

  async login(email: string, password: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
        password,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email ou senha Incorreta');
    }

    return this.createToken(user);
  }
  async forgetPassword(email: string) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Email Incorreto');
    }

    //TO DO send email with token
    return true;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async resetPassword(password: string, _token: string) {
    //TO DO check if token is valid

    const id = 0;

    const user = await this.prismaService.user.update({
      where: {
        id,
      },
      data: {
        password,
      },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDto) {
    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
