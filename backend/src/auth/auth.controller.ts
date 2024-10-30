import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body('username') username: string, @Body('password') password: string): Promise<void> {
    return this.authService.register(username, password);
  }

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string): Promise<{ accessToken: string }> {
    return this.authService.login(username, password);
  }
}
