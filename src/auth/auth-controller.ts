import { Body, Controller, Post } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth.login.dto';
import { AuthRegisterDto } from './dto/auth.register.dto';
import { AuthForgetPasswordDto } from './dto/auth.forget-password.dto';
import { AuthResetPasswordDto } from './dto/auth.reset-password.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() { email, password }: AuthLoginDto) {
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() body: AuthRegisterDto) {
    return this.userService.create(body);
  }

  @Post('forget-password')
  async forgetPassword(@Body() { email }: AuthForgetPasswordDto) {
    return this.authService.forgetPassword(email);
  }

  @Post('reset-password')
  async resetPassword(@Body() { password, token }: AuthResetPasswordDto) {
    return this.authService.resetPassword(password, token);
  }
}
