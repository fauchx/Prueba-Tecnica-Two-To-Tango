import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<void> {
    const { username, password } = createUserDto; // Desestructuramos para obtener los valores
    await this.authService.register(createUserDto);
  }

  // Aquí puedes agregar otros métodos, como login
  @Post('login')
  async login(@Body() createUserDto: CreateUserDto): Promise<{ accessToken: string }> {
    const { username, password } = createUserDto;
    return await this.authService.login(username, password);
  }
}
